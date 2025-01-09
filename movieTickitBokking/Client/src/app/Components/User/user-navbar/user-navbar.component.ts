import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
@Input() userData:any;
  adminNavMenus = [
    { name: 'Movies', path: '/movies' },
    { name: 'Bookings', path: '/comming-soon' }
    // { name: 'feedback', path: '/comming-soon' }
  ];

  constructor(private router: Router, private authApi:AuthServiceService) {}

  logout(){
    this.authApi.logout('token');
  }

  ngOnInit() {
    console.log(this.userData);
    
  }
}
