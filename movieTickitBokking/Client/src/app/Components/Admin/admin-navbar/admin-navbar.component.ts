import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRestApiService } from '../../../Services/user-rest-api.service';
import { AuthServiceService } from '../../../Services/auth-service.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
 @Input() adminData:any;
  adminNavMenus = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Movies', path: '/comming-soon' },
    { name: 'Manage Users', path: '/comming-soon' },
    { name: 'Bookings', path: '/comming-soon' },
    { name: 'Reports', path: '/comming-soon' }
  ];

  constructor(private router: Router, private authApi:AuthServiceService) {}

  logout(){
    this.authApi.logout('token');
  }

  ngOnInit() {
    console.log(this.adminData);
    
  }
  
}
