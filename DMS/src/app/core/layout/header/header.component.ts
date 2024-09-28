import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router'
import { NavigationService } from '../../../shared/services/navigation.service';
import { LoginService } from '../../auth/services/login.service';
import { RoleService } from '../../../shared/services/role.service';
import { SharedService } from '../../../features/folder/shared.service';


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

  constructor(
    protected router: Router,
    protected navigateService: NavigationService,
    private loginService: LoginService,
    private roleService: RoleService,
    private sharedService: SharedService) { }

  ngOnInit(): void {

    this.roleService.getRole().subscribe((role) => {
      this.role = role;
      this.setLinksByRole();
      this.checkRoute();
    });

  }



  setLinksByRole(): void {
    this.links = []; // to avoid duplicates


    // for specific role
    if (this.role === 'User') {
      this.links.push({
        label: 'My Workspace',
        route: '/workspace'
      });
    }
    else if (this.role === 'Admin') {
      this.links.push({
        label: 'Manage Users',
        route: '/get-all-users'
      });
    }

    //for all roles
    if (this.role) {
      this.links.push({ label: 'Shared Directories', route: '/shared-directories' });
      this.links.push({ label: 'Profile', route: '/profile' });
      this.links.push({ label: 'Logout' });
    }

  }

  HandleTabClick(route: string) {
    if (route === '/shared-directories') {
      this.sharedService.setIsShared(true);
    }
    else if (route === '/workspace') {
      this.sharedService.setIsShared(false);
    }

    this.navigateService.navigateTo(route);
  }


  checkRoute(): void {
    this.router.events.subscribe(() => {

      const currentRoute = this.router.url;
      if (currentRoute.includes('shared-directories')) {
        this.sharedService.setIsShared(true);
      }
      else {
        this.sharedService.setIsShared(false);
      }
    });
  }

  logout(): void {
    this.loginService.logout();
  }




}
