import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatTabsModule 
          ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
