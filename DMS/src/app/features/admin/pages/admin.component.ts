import {Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { UserModel } from '../../user/user.model';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LockDialogComponent } from '../dialog/lock-dialog/lock-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationConfig } from '../../../shared/Enums/Pagination.enum';





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

  usersDataSource = new MatTableDataSource<UserModel>([]);

    // Using enum values
    pageSize = PaginationConfig.DefaultPageSize;
    pageNumber = PaginationConfig.DefaultPageNumber;

    disableNextButton: boolean = false; 

    paginationConfig = PaginationConfig;


 

  constructor(private adminService: AdminService,
    private keyValuePipe: KeyValuePipe,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }



  ngOnInit(): void
    {
    this.fetchAllUsers(this.pageNumber, this.pageSize); 
    } 


  fetchAllUsers(pageNumber: number, pageSize: number): void {
    this.adminService.getAllUsers(pageNumber, pageSize).subscribe((result) => {

      this.usersData = result.Items;
      this.usersDataSource.data = this.usersData;

      this.disableNextButton = this.usersData.length < this.pageSize;


      this.ExtractKeyOfUsers();

      
    });
  }

  lockUser(userId: number, lockTime: number, timeUnit: string) {
    this.adminService.lockUser(userId, lockTime, timeUnit).subscribe(() => {
      this.snackBar.open('User locked successfully', 'Close', { duration: 2000 });
      this.fetchAllUsers(this.pageNumber, this.pageSize); 
    });
  }

  unlockUser(userId: number) {
    this.adminService.unlockUser(userId).subscribe({
      next: () => {
        this.snackBar.open('User unlocked successfully', 'Close', { duration: 2000 });
        this.fetchAllUsers(this.pageNumber, this.pageSize); // refresh the table after
      },
      error: (error) => {
        if (error.status === 404) {
          this.snackBar.open('User not found.', 'Close', { duration: 2000 });
        } else if (error.status === 409) {
          this.snackBar.open('User is not locked.', 'Close', { duration: 2000 });
        } else {
          this.snackBar.open('Failed to unlock the user.', 'Close', { duration: 2000 });
        }
      }
    });
  }


  ExtractKeyOfUsers(): void {
    // Check if usersData exists and is an array
    if (Array.isArray(this.usersData) && this.usersData.length > 0) {
      const keyValueArray = this.keyValuePipe.transform(this.usersData[0]);
      this.displayedColumns = keyValueArray.map(entry => entry.key)
        .filter(key => key !== 'WorkspaceName');
    } else {
      this.displayedColumns = []; // Reset to empty if usersData is undefined or empty
    }
  }
  

  openLockDialog(userId: number) {
    const dialogRef = this.dialog.open(LockDialogComponent, {
      width: '400px',
      height: '325px'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lockUser(userId, result.lockTime, result.timeUnit);
      }
    });
  }

  viewUserFolders(userId: number): void {
    this.router.navigate(['/workspace'], { queryParams: { userId: userId } });

  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.usersDataSource.filter = filterValue; 
  }

  goToPreviousPage() : void
  {
    if(this.pageNumber>1)
    {
      this.pageNumber--;
      this.fetchAllUsers(this.pageNumber,this.pageSize);
    }
  }

  goToNextPage(): void 
  {
    if (!this.disableNextButton) 
    {
      this.pageNumber++;
      this.fetchAllUsers(this.pageNumber, this.pageSize);  
    }
  }
}
