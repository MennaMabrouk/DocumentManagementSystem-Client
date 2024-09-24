import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../user.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../shared/services/role.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  isAdmin: boolean = false;
  userProfile: UserModel | null = null;

  constructor(private userService: UserService,
    private roleService : RoleService) { }

  ngOnInit(): void {

    this.isAdmin = this.roleService.isAdmin();

    this.userService.getUserId().subscribe(userId => {
      if (userId) 
      {
        this.fetchUserProfile(userId);
      }
    });

    console.log(this.roleService.getRole());
  }

  fetchUserProfile(userId: number)
  {
    this.userService.getUserById(userId).subscribe(user => {
      this.userProfile = user
    });
  }


}
