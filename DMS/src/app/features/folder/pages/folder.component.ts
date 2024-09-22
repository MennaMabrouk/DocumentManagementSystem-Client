  import { Component, OnInit } from '@angular/core';
  import { FolderService } from '../folder.service';
  import { UserService } from '../../user/user.service';
  import { FolderModel } from '../folder.model';
  import { ListingComponent } from '../../../shared/components/listing/listing.component';
import { ActivatedRoute } from '@angular/router';

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
                private route : ActivatedRoute) {}

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
            this.fetchFolders(userId);   
          })
        }
      }
      )
    }

  fetchFolders(userId : number| null) : void
  {
    if (userId !== null) {
      this.folderService.getAllFoldersByUserId(userId).subscribe(folders => {
        this.foldersData = folders;
        // console.log("Parent component foldersData: ", this.foldersData);
      });
    }
  }

fetchSharedFolders() 
{
  this.folderService.GetAllPublicFolders().subscribe(folders =>
  {
    console.log('API response for public folders:', folders);
    folders.forEach(folder => {
      console.log('Folder:', folder);
    });
    this.foldersData = folders.filter(folder =>folder.IsPublic)
    console.log('Filtered public folders:', this.foldersData);
    // console.log('Shared directories (public folders): ', this.foldersData);
  });
}

  }
