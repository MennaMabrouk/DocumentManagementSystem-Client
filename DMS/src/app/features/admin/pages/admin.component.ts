import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from '../admin.service';
import { UserModel } from '../../user/user.model';
import { RoleService } from '../../../shared/services/role.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LockDialogComponent } from '../dialog/lock-dialog/lock-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


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
    private keyValuePipe: KeyValuePipe,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router : Router) { }

  ngOnInit(): void {

      this.fetchAllUsers();
    
  }

  fetchAllUsers() 
  {
    this.adminService.getAllUsers().subscribe(users => {
      this.usersData = users

      this.ExtractKeyOfUsers(); // Extract the columns for the table

    });
  }


  lockUser(userId: number, lockTime: number, timeUnit: string)
  {
    this.adminService.lockUser(userId, lockTime, timeUnit).subscribe(() => {
      this.snackBar.open('User locked successfully', 'Close', { duration: 2000 });
      this.fetchAllUsers(); //for refreshing the table after
    });
  }


  unlockUser(userId: number) 
  {
    this.adminService.unlockUser(userId).subscribe(() => {
      this.snackBar.open('User unlocked successfully', 'Close', { duration: 2000 });
      this.fetchAllUsers(); //for refreshing the table after
    });
  }

  ExtractKeyOfUsers(): void 
  {
    if (this.usersData.length > 0) {
      const keyValueArray = this.keyValuePipe.transform(this.usersData[0]);
      this.displayedColumns = keyValueArray.map(entry => entry.key)
        .filter(key => key !== 'WorkspaceName');
    }
    else {
      this.displayedColumns = [];
    }

  }

  openLockDialog(userId: number) 
  {
    const dialogRef = this.dialog.open(LockDialogComponent, {
      width: '300px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        this.lockUser(userId, result.lockTime, result.timeUnit);
      }
    });
  }

  viewUserFolders(userId : number) : void
  {
    this.router.navigate(['/folders'], { queryParams: { userId: userId } });

  }

}
