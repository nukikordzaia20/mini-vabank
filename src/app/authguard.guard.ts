import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const API = 'http://127.0.0.1:5000/api';

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const http = inject(HttpClient);

  // If no token exists, deny access and redirect to login page
  if (!token) {
    router.navigate(['/login']);
    return of(false); // Deny access
  }

  // Set HTTP options with Authorization header
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    })
  };

  // Make the HTTP request and return an Observable<boolean>
  return http.post(`${API}/is_authenticated`, null, httpOptions).pipe(
    map((response: any) => {
      // If the user is authenticated, allow access
      console.log('User authenticated:', response);
      return true;  // Allow access
    }),
    catchError((error) => {
      console.error('Authentication failed:', error);
      // If the token is invalid, redirect to the login page and deny access
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return of(false);  // Deny access
    })
  );
};


export const NoAuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const http = inject(HttpClient);

  if (!token) {
    return of(true);  // Allow navigation if no token
  }

  // Set HTTP options with Authorization header
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    })
  };

  // Make the HTTP request and return an Observable<boolean>
  return http.post(`${API}/is_authenticated`, null, httpOptions).pipe(
    map((response: any) => {
      // If user is authenticated, navigate to dashboard and block the route
      router.navigate(['/dashboard']);
      return false;
    }),
    catchError((error) => {
      console.error('User error', error);
      localStorage.removeItem('token');
      // Allow the navigation if an error occurs (token is invalid)
      return of(true);
    })
  );
};
