import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mini-vabank';
}
