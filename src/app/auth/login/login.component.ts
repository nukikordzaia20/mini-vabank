import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup,  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    }
  );

  constructor(private authService: AuthService, private router: Router) {}


  login() {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/dashboard');
          console.log("Shevida");
        },
        error: (error) => {
          localStorage.removeItem('token');
          console.error('Login failed', error);
        }
      }
    )
  }
}
