import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

const API = 'http://127.0.0.1:5000/api';

@Injectable()
export class AuthService{
  constructor(private http: HttpClient) {}

  register(formData: any): Observable<any>{
    return this.http.post(`${API}/register`, formData, httpOptions);
  }

  login(formData: any){
    return this.http.post(`${API}/login`, formData, httpOptions)
  }

  isLoggedIn(){
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    httpOptions.headers = httpOptions.headers.set('Authorization', `${localStorage.getItem('token')}`);
    return this.http.get(`${API}/user`, httpOptions).subscribe({
      next: (response) => {
        return true;
      },
      error: (error) => {
        return false;
      }
    });
  }

}
