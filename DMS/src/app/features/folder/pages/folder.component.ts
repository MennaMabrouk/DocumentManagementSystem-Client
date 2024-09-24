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
  context: 'workspace' | 'shared' = 'workspace';


  constructor(private folderService: FolderService,
    private userService: UserService,
    private roleService : RoleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    protected router: Router) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.context = params['context'] || 'workspace';
      if (this.context === 'shared') 
      {
        this.context = 'shared';
        this.fetchSharedFolders();
      } 
      else
       {

        this.context = 'workspace';
        this.userService.getUserId().subscribe(userId => {
          if (userId !== null) {
            this.fetchFolders(userId);
          }
        });
      }
    });

    // Set admin status
    this.isAdmin = this.roleService.isAdmin();
  }

  fetchFolders(userId: number | null): void {
    if (userId !== null) {
      this.folderService.getAllFoldersByUserId(userId).subscribe(folders => {
        this.foldersData = folders;
        // console.log("Parent component foldersData: ", this.foldersData);
      });
    }
    else {
      console.error('User ID is null. Unable to fetch folders.');
    }


  }

  fetchSharedFolders() {
    this.folderService.GetAllPublicFolders().subscribe(folders => {
      this.foldersData = folders.filter(folder => folder.IsPublic)
      // console.log('Filtered public folders:', this.foldersData);
      // console.log('Shared directories (public folders): ', this.foldersData);
    });
  }


  openFolder(folderId: number): void {

    this.router.navigate(['/document', folderId], { queryParams: { context: this.context } });
  }

  openCreateFolderDialog(): void {
    const dialogRef = this.dialog.open(CreateFolderDialogComponent, {
      width: '400px'
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
        this.fetchFolders(userId);
      });
    });

  }



  openUpdateDialog(folderItem: Item): void {

    const folder = folderItem as FolderModel

    const dialogRef = this.dialog.open(UpdateFolderDialogComponent, {
      width: '400px',
      data: folder
    });

    dialogRef.afterClosed().subscribe(updatedFolder => {
      if (updatedFolder) {
        this.updateFolder(updatedFolder);
      }
    });

  }



  updateFolder(folder: FolderModel) {
    // console.log('Updating folder with data:', folder); 
    this.folderService.UpdateFolder(folder).subscribe(() => {
      this.userService.getUserId().subscribe(userId => {
        this.fetchFolders(userId);
      });
    });
  }

  openDeleteDialog(folderId: number): void {
    const dialogRef = this.dialog.open(DeleteFolderDialogComponent, {
      width: '600px',
      height: '150px',
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
        this.fetchFolders(userId);
      });
    });
  }

}
