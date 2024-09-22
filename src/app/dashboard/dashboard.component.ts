import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {SearchComponent} from "../search/search.component";
import {ClientsComponent} from "../clients/clients.component";
import {ClientDetailsComponent} from "../clients/detail/client-details.component";
import {AccountsComponent} from "../clients/accounts/accounts.component";
import { CommonModule } from '@angular/common';
import {RegisterClientComponent} from "../clients/register-client/register-client.component";
import {CreateAccountComponent} from "../clients/accounts/create-account/create-account.component";

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SearchComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AccountsComponent,
    RegisterClientComponent,
    CreateAccountComponent
  ],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  user: any;
  clients: any[] = [];
  client: any;

  dashboardMode: "search" | "detail" | "add" = "search";
  showClientTable = false;


  constructor(private apiService: ApiService, private router: Router) {}

  detailExit(){
    this.dashboardMode = "search";
    this.showClientTable = false;
  }

  handleClientSearch(searchResult: any){
    this.clients = searchResult.clients
    this.showClientTable = true;
  }

  openClientDetail(client: any){
    this.dashboardMode = "detail";
    this.client = client;
  }

  handleClientAdd(){
    this.dashboardMode = "add";
  }

  handleClientRegistered(client: any){
    this.dashboardMode = "detail";
    this.client = client;
  }

  logout() {
    this.apiService.logout().subscribe({
      next: (response) => {
        console.log('Logout response', response);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
  }

  getSystemTime(){
    return new Date().toLocaleString('ka-GE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }


  ngOnInit() {
    this.apiService.getUser().subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }
    });
  }
}
