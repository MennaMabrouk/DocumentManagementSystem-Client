import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule,MatTabsModule
          ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userId = '123'; // dynamically set userId as needed
  links = [
    { label: 'My Workspace', route: `/workspace/${this.userId}` },
    { label: 'Shared Directories', route: '/shared-directories' }
  ];
  activeLink = this.links[0].label;

}
