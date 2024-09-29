import { Component, OnInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { UserService } from '../../user/user.service';
import { FolderModel } from '../folder.model';
import { ListingComponent } from '../../../shared/components/listing/listing.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateFolderDialogComponent } from '../dialogs/update-folder-dialog/update-folder-dialog.component';
import { DeleteFolderDialogComponent } from '../dialogs/delete-folder-dialog/delete-folder-dialog.component';
import { CreateFolderDialogComponent } from '../dialogs/create-folder-dialog/create-folder-dialog.component';
import { Item } from '../../../shared/item.interface';
import { RoleService } from '../../../shared/services/role.service';
import { SharedService } from '../shared.service';
import { PaginationConfig } from '../../../shared/Enums/Pagination.enum';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [ListingComponent],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss'
})
export class FolderComponent implements OnInit {

  foldersData: FolderModel[] = [];
  isAdmin: boolean = false;
  isShared = false;
  userId: number | null = null;


  // Using enum values
  pageSize = PaginationConfig.DefaultPageSize;
  pageNumber = PaginationConfig.DefaultPageNumber;

  disableNextButton: boolean = false;

  paginationConfig = PaginationConfig;




  constructor(private folderService: FolderService,
    private userService: UserService,
    private roleService: RoleService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    protected router: Router,) { }


  ngOnInit(): void {

    this.roleService.isAdminObservable().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.sharedService.getIsShared().subscribe(isShared => {
      this.isShared = isShared;


      if (this.isShared) {
        this.fetchSharedFolders(this.pageNumber, this.pageSize);
      }
      else {
        //admin
        this.route.queryParams.subscribe(params => {
          if (this.isAdmin && params['userId']) {
            this.userId = +params['userId'];
            this.fetchFolders(this.userId, this.pageNumber, this.pageSize);
          }
          else {
            //user
            this.userService.getUserId().subscribe(userId => {
              console.log('Fetched user ID', userId);
              if (userId !== null) {
                this.fetchFolders(userId, this.pageNumber, this.pageSize);
              }
            });
          }
        });
      }
    });
  }

  fetchFolders(userId: number | null, pageNumber: number, pageSize: number): void {
    if (userId !== null) {
      this.folderService.getAllFoldersByUserId(userId, pageNumber, pageSize).subscribe(folders => {
        this.foldersData = folders.Items;
        this.disableNextButton = this.foldersData.length < this.pageSize;
      });
    }
    else {
      console.error('User ID is null. Unable to fetch folders.');
    }

  }

  fetchSharedFolders(pageNumber: number, pageSize: number) {
    this.folderService.GetAllPublicFolders(pageNumber, pageSize).subscribe(folders => {
      this.foldersData = folders.Items
      this.disableNextButton = this.foldersData.length < this.pageSize;
    });
  }


  openFolder(folderId: number): void {
    this.router.navigate(['/document', folderId], { queryParams: { isShared: this.isShared } });
  }

  openCreateFolderDialog(): void {
    const dialogRef = this.dialog.open(CreateFolderDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newFolder: FolderModel = {
          ...result,
          CreationDate: new Date(),
          FolderId: 0
        };

        this.createFolder(newFolder);
      }
    });

  }


  createFolder(folder: FolderModel) {
    this.folderService.CreateFolder(folder).subscribe(() => {
      this.userService.getUserId().subscribe(userId => {
        this.fetchFolders(userId, this.pageNumber, this.pageSize);
      });
    });

  }



  openUpdateDialog(folderItem: Item): void {

    const folder = folderItem as FolderModel

    const dialogRef = this.dialog.open(UpdateFolderDialogComponent, {
      width: '500px',
      data: folder
    });

    dialogRef.afterClosed().subscribe(updatedFolder => {
      if (updatedFolder) {
        this.updateFolder(updatedFolder);
      }
    });

  }



  updateFolder(folder: FolderModel) {
    this.folderService.UpdateFolder(folder).subscribe(() => {
      this.userService.getUserId().subscribe(userId => {
        this.fetchFolders(userId, this.pageNumber, this.pageSize);
      });
    });
  }

  openDeleteDialog(folderId: number): void {
    const dialogRef = this.dialog.open(DeleteFolderDialogComponent, {
      width: '450px',
      height: '175px',
      data: { folderId }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteFolder(folderId);
      }
    }
    )
  }

  deleteFolder(folderId: number) {
    this.folderService.DeleteFolder(folderId).subscribe(() => {
      this.userService.getUserId().subscribe(userId => {
        this.fetchFolders(userId, this.pageNumber, this.pageSize);
      });
    });
  }

  goToPreviousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      if (this.isShared) {
        this.fetchSharedFolders(this.pageNumber, this.pageSize);
      } else {
        this.userService.getUserId().subscribe(userId => {
          this.fetchFolders(userId, this.pageNumber, this.pageSize);
        });
      }
    }
  }

  goToNextPage(): void {
    if (!this.disableNextButton) {
      this.pageNumber++;
      if (this.isShared) {
        this.fetchSharedFolders(this.pageNumber, this.pageSize);
      } else {
        this.userService.getUserId().subscribe(userId => {
          this.fetchFolders(userId, this.pageNumber, this.pageSize);
        });
      }
    }
  }


}
