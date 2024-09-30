import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { LoginService } from '../../../core/auth/services/login.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [MatCardModule,RouterModule,MatButtonModule],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent implements OnInit {

  isLoggedIn : boolean = false;

  constructor(private navigationService : NavigationService,
              private loginService : LoginService) {}

  ngOnInit(): void
  {
    this.loginService.getLoginStatus().subscribe(isLoggedIn =>{
      this.isLoggedIn = isLoggedIn
    });
  }

  returnPoint() : void
  {
      if(this.isLoggedIn)
      {
        this.navigationService.navigateTo('/dashboard');
      }
      else
      {
        this.navigationService.navigateTo('/login');
      }
  }

}
