import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";
import { Route, Router } from '@angular/router';
import { UserRestApiService } from '../../../Services/user-rest-api.service';


@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminNavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
 constructor(private router:Router,private userApi:UserRestApiService,) {}
 adminData:any;
 noOfUsers:any;
   ngOnInit() {
    // const token = this.userApi.getToken();
    const token = localStorage.getItem('token')
    console.log(token);
    
    if (token) {
      this.userApi.getUserByEmail(token).subscribe((data) => {
        console.log(data);
        this.adminData = data;
      });
      this.getNumberOfUsers()
    } else {
      this.router.navigate(['/login']);
    }
  }

  getNumberOfUsers() {
    this.userApi.getNumberOfUsers().subscribe((data) => {
     
      this.noOfUsers = data;
      
    });
  }
    

}
