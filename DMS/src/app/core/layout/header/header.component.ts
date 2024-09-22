import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router'
import { StorageService } from '../../../shared/services/storage.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { LoginService } from '../../auth/services/login.service';
import { UserService } from '../../../features/user/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatTabsModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  role: string | null = null;
  links: {
    label: string;
    route?: string
   }[] = [];

   private userId : number | null = null;


  constructor(private storage : StorageService,
              protected router : Router,
              protected navigateService : NavigationService,
              private loginService : LoginService,
              private userService : UserService) {}

  ngOnInit(): void {
    this.role = this.storage.getItem('role');

    this.userService.getUserId().subscribe(userId => {
      this.userId = userId;
      console.log("Hello user ID : ", userId);
      this.setLinksByRole(); 
    });

    this.loginService.userChange$.subscribe(res => {
      // console.log("role ");
      // console.log(res);
      this.role=res.role
      this.setLinksByRole();

    });
  }



  setLinksByRole(): void {
    this.links = []; // to avoid duplicates

    
    // for specific role
    if (this.role === 'User' && this.userId) {
      this.links.push({
        label: 'My Workspace',
        route: `/workspace/${this.userId}`
      });
    }
    else if (this.role === 'Admin') {
      this.links.push({
        label: 'Manage Users',
        route: '/get-all-users'
      });
    }
    
    //for all roles
    const token = this.storage.getItem('token');
    this.role = this.storage.getItem('role');
    // console.log(this.role);
    if (token) {
      this.links.push({ label: 'Shared Directories', route: '/shared-directories' });
      this.links.push({ label: 'Profile', route: '/profile' });
      this.links.push({ label: 'Logout'});
    }

  }

  logout() : void
  {
    this.loginService.logout();
  }




}
