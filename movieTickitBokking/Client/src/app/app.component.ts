import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AdminNavbarComponent } from "./Components/Admin/admin-navbar/admin-navbar.component";
import { UserRestApiService } from './Services/user-rest-api.service';
import { response } from 'express';
import { AdminDashboardComponent } from "./Components/Admin/admin-dashboard/admin-dashboard.component";
import { ProfileComponent } from "./Components/profile/profile.component";
import { AuthServiceService } from './Services/auth-service.service';
import { UserNavbarComponent } from "./Components/User/user-navbar/user-navbar.component";
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, AdminNavbarComponent,  UserNavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Client';
  constructor(private userApi: UserRestApiService, private authApi: AuthServiceService) {}

}
