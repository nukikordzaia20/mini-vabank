import { Routes } from '@angular/router';
import {RegistrationComponent} from "./auth/registration/registration.component";
import {LoginComponent} from "./auth/login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { AuthGuard, NoAuthGuard } from './authguard.guard';

export const routes: Routes = [
  { path: "dashboard", component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "register", component: RegistrationComponent,
    canActivate: [NoAuthGuard]
  },
  { path: "login", component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }
];
