import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './Components/otp-verification/otp-verification.component';
import { UserDashboardComponent } from './Components/User/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { adminAuthGuardGuard } from './Gard/admin-auth-guard.guard';
import { MoviesListComponent } from './Components/movies-list/movies-list.component';
import { CommingSoonComponent } from './Components/comming-soon/comming-soon.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FooterComponent } from './Components/footer/footer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'movies',
        component: MoviesListComponent
      },{
        path:'footer',
        component:FooterComponent
      }
     
    ]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'otp-verification',
    component: OtpVerificationComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    children: [
      {
        path: 'profile', // Profile for user
        component: ProfileComponent,
      }
    ]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    // canActivate: [adminAuthGuardGuard],
    children: [
      {
        path: 'profile', // Profile for admin
        component: ProfileComponent,
      }
    ]
  },
  {
    path: 'comming-soon',
    component: CommingSoonComponent
  }
];

