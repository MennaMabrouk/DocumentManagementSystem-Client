import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from '../admin.service';
import { UserModel } from '../../user/user.model';
import { RoleService } from '../../../shared/services/role.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, KeyValuePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [KeyValuePipe]
})
export class AdminComponent implements OnInit {

  isAdmin: boolean = false;
  usersData: UserModel[] = [];
  displayedColumns: string[] = [];


  constructor(private adminService: AdminService,
    private roleService: RoleService,
    private keyValuePipe: KeyValuePipe) { }

  ngOnInit(): void {

    this.isAdmin = this.roleService.isAdmin();

    if (this.isAdmin) 
    {
  
      this.fetchAllUsers();

    }
  }

  fetchAllUsers() {
    this.adminService.getAllUsers().subscribe(users => {
      this.usersData = users

      this.ExtractKeyOfUsers(); // Extract the columns for the table

    });
  }


  lockUser(userId: number) 
  {
    this.adminService.lockUser(userId).subscribe(() => {
      alert('User locked successfully')
      this.fetchAllUsers(); //for refreshing the table after
    });
  }


  unlockUser(userId: number)
   {
    this.adminService.unlockUser(userId).subscribe(() => {
      alert('User unlocked successfully')
      this.fetchAllUsers(); //for refreshing the table after
    });
  }

  ExtractKeyOfUsers() : void
  {
    if (this.usersData.length > 0) 
      {
        const keyValueArray = this.keyValuePipe.transform(this.usersData[0]);
        this.displayedColumns = keyValueArray.map(entry => entry.key)
                .filter(key => key !== 'WorkspaceName');
      }
      else 
      {
        this.displayedColumns = [];
      }

  }

}
