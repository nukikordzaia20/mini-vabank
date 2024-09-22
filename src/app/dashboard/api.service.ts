import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

const API = 'http://127.0.0.1:5000/api';

@Injectable()
export class ApiService{
  constructor(private http: HttpClient) {}

  private getHttpHeaders(){
    return new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': localStorage.getItem('token') || '',
      })
  }

  getUser(){
    return this.http.get(`${API}/user`, {headers: this.getHttpHeaders()});
  }

  getClients(searchQuery: any){
    let params = new HttpParams();
    if (searchQuery.name){
      params = params.append('name', searchQuery.name);
    }
    if (searchQuery.lastName){
      params = params.append('lastName', searchQuery.lastName);
    }
    if (searchQuery.clientKey){
      params = params.append('clientKey', searchQuery.clientKey);
    }

    let options = {
      headers: this.getHttpHeaders(),
      params: params,
    }

    return this.http.get(`${API}/clients`, options)

  }

  registerClient(formData: any){
    return this.http.post(`${API}/clients`, formData, {headers: this.getHttpHeaders()});
  }

  logout(){
    return this.http.post(`${API}/logout`, null, {headers: this.getHttpHeaders()});
  }

  createAccount(clientKey: any, formData: any){
    const payload = {
      name: formData.name,
      balance: formData.balance,
      clientKey: clientKey,
    }
    return this.http.post(`${API}/accounts`, payload, {headers: this.getHttpHeaders()});
  }

  transfer(clientKey: any, formData: any){
    const payload = {
      sourceAccount: formData.sourceAccount,
      targetAccount: formData.targetAccount,
      amount: formData.amount,
      clientKey: clientKey,
    }
    return this.http.post(`${API}/transfer`, payload, {headers: this.getHttpHeaders()});
  }
}
