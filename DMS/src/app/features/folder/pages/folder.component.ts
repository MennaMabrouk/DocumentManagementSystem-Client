  import { Component, OnInit } from '@angular/core';
  import { FolderService } from '../folder.service';
  import { UserService } from '../../user/user.service';
  import { FolderModel } from '../folder.model';
  import { ListingComponent } from '../../../shared/components/listing/listing.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateFolderDialogComponent } from '../../../shared/components/dialogs/update-folder-dialog/update-folder-dialog.component';
import { DeleteFolderDialogComponent } from '../../../shared/components/dialogs/delete-folder-dialog/delete-folder-dialog.component';
import { CreateFolderDialogComponent } from '../../../shared/components/dialogs/create-folder-dialog/create-folder-dialog.component';

  @Component({
    selector: 'app-folder',
    standalone: true,
    imports: [ListingComponent],
    templateUrl: './folder.component.html',
    styleUrl: './folder.component.scss'
  })
  export class FolderComponent implements OnInit{

    foldersData: FolderModel[] = [];
    context    : 'workspace' | 'shared' = 'workspace';


    constructor(private folderService : FolderService,
                private userService : UserService,
                private route : ActivatedRoute,
                private dialog : MatDialog) {}

    ngOnInit(): void {
      this.route.data.subscribe(data =>
      {  
        if(data['context'] === 'shared')
        {
          this.context = 'shared';
          this.fetchSharedFolders();
        }
        else
        {
          this.context = 'workspace';
          this.userService.getUserId().subscribe(userId => {
            if(userId !== null)
            this.fetchFolders(userId);   
          })
        }
      });
    }

  fetchFolders(userId : number | null) : void
  {
    if(userId !==null)
    {
      this.folderService.getAllFoldersByUserId(userId).subscribe(folders => {
        this.foldersData = folders;
        // console.log("Parent component foldersData: ", this.foldersData);
      });
    }
    else
    {
      console.error('User ID is null. Unable to fetch folders.');
    }

    
  }

fetchSharedFolders() 
{
  this.folderService.GetAllPublicFolders().subscribe(folders =>
  {
    // console.log('API response for public folders:', folders);
    // folders.forEach(folder => {
    //   console.log('Folder:', folder);
    // });
    this.foldersData = folders.filter(folder =>folder.IsPublic)
    // console.log('Filtered public folders:', this.foldersData);
    // console.log('Shared directories (public folders): ', this.foldersData);
  });
}

openCreateFolderDialog() : void
{
  const dialogRef = this.dialog.open(CreateFolderDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result)
     {
      const newFolder : FolderModel = {
        ...result,
        CreationDate : new Date(),
        FolderId  : 0
      };

      this.createFolder(newFolder); 
    }
    });

}


createFolder(folder : FolderModel)
{
  this.folderService.CreateFolder(folder).subscribe(()=>
  {
    this.userService.getUserId().subscribe(userId => {
      this.fetchFolders(userId); 
    });
  });

}



openUpdateDialog(folderId: number): void {
  // console.log('Opening update dialog for folder ID:', folderId); 
  this.folderService.GetFolderByFolderId(folderId).subscribe(folder => {
    // console.log('Folder data retrieved for update:', folder);
    const dialogRef = this.dialog.open(UpdateFolderDialogComponent, {
      width: '400px',
      data: folder
    });

    dialogRef.afterClosed().subscribe(updatedFolder => {
      if (updatedFolder)
     {
        this.updateFolder(updatedFolder); 
      }
    });
  });
}



updateFolder(folder : FolderModel)
{
  console.log('Updating folder with data:', folder); // Check the structure
  this.folderService.UpdateFolder(folder).subscribe(()=>
  {
    this.userService.getUserId().subscribe(userId =>
    {
      this.fetchFolders(userId);
    });
  });
}

openDeleteDialog(folderId : number) : void
{
  const dialogRef = this.dialog.open(DeleteFolderDialogComponent,{
    width: '600px',
    height:'150px',
    data: {folderId}
  });

  dialogRef.afterClosed().subscribe(confirmed =>
  {
    if(confirmed)
    {
      this.deleteFolder(folderId);
    }
  }
  )
}

deleteFolder(folderId : number) {
  this.folderService.DeleteFolder(folderId).subscribe(() => {
    this.userService.getUserId().subscribe(userId => {
      this.fetchFolders(userId); 
    });
  });
}

  }
