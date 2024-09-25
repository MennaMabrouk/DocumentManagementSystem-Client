import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router'
import { StorageService } from '../../../shared/services/storage.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { LoginService } from '../../auth/services/login.service';
import { UserService } from '../../../features/user/user.service';
import { RoleService } from '../../../shared/services/role.service';


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

  private userId: number | null = null;


  constructor(private storage: StorageService,
    protected router: Router,
    protected navigateService: NavigationService,
    private loginService: LoginService,
    private roleService :RoleService) { }

  ngOnInit(): void {

    this.roleService.getRole().subscribe((role) =>{
      this.role = role;
      this.setLinksByRole();
    });

    // this.userService.getUserId().subscribe(userId => {
    //   this.userId = userId;
    //   if (this.role && this.userId)
    //   {
    //     this.setLinksByRole();
    //   }
    // });

  }



  setLinksByRole(): void 
  {
    this.links = []; // to avoid duplicates


    // for specific role
    if (this.role === 'User')
    {
      this.links.push({
        label: 'My Workspace',
        route: '/workspace'
      });
    }
    else if (this.role === 'Admin') 
    {
      this.links.push({
        label: 'Manage Users',
        route: '/get-all-users'
      });
    }

    //for all roles
    if (this.role) 
    {
      this.links.push({ label: 'Shared Directories', route: '/shared-directories' });
      this.links.push({ label: 'Profile', route: '/profile' });
      this.links.push({ label: 'Logout' });
    }

  }

  logout(): void 
  {
    this.loginService.logout();
  }




}
