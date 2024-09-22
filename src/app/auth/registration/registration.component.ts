import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [AuthService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  }
  );

  constructor(private authService: AuthService, private router: Router) {}


  register() {
      const formData = this.registrationForm.value;
      if (formData.password !== formData.repeatPassword) {
        alert('Passwords do not match!');
        return;
      }

      this.authService.register(formData)
        .subscribe({
          next: (response) => {
            console.log('Registration successful', response);
            this.router.navigateByUrl('/login');
          },
          error: (error) => {
            console.error('Registration failed', error);
          }
        });
  }
}
