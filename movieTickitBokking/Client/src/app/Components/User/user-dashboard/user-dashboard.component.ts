import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserRestApiService } from '../../../Services/user-rest-api.service';
import { AdminNavbarComponent } from "../../Admin/admin-navbar/admin-navbar.component";
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { AuthServiceService } from '../../../Services/auth-service.service';
import { MoviesListComponent } from "../../movies-list/movies-list.component";

@Component({
  selector: 'app-user-dashboard',
  imports: [AdminNavbarComponent, UserNavbarComponent, MoviesListComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(private router:Router,private userApi:UserRestApiService,private authApi:AuthServiceService) {}
  
  userData:any;
     ngOnInit() {
        const token = this.userApi.getToken();
        if(!token){
          this.router.navigate(['/login']);
        }else{
  
          this.userApi.getUserByEmail(token).subscribe((data)=>{
            
            console.log(data);   
            this.userData = data; 
        })
        this.authApi.loginStatus = true
      }
    }
      
}
