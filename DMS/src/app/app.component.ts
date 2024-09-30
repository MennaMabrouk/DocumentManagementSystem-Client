import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/layout/header/header.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { CommonModule } from '@angular/common';
import { LoginService } from './core/auth/services/login.service';
import { NavigationService } from './shared/services/navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'DMS';

  constructor(private loginService : LoginService,
              private navigationService : NavigationService) {}

  ngOnInit(): void {
    this.loginService.getLoginStatus().subscribe(isLoggedIn =>{
      if(isLoggedIn)
      {
        this.navigationService.navigateTo('/dashboard');
      }
      else
      {
        this.navigationService.navigateTo('/login');
      }
    })
  }
}
