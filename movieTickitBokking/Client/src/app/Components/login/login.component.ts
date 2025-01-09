import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { UserRestApiService } from '../../Services/user-rest-api.service';
import { ValidationsService } from '../../Services/validations.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  password: string = '';
  username: any;
  isAdmin: boolean = false;
  role: string = 'USER';
  imagePath: string = 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg';


  constructor(
    private authApi: AuthServiceService,
    private userApi: UserRestApiService,
    private validate: ValidationsService,
    private router: Router,
    private mytost: ToastrService
  ) {}

  admin: any = {
    password: 'password10',
    email: 'user10@example.com',
    phoneNumber: 1234567900,
    isAdmin: true,
  };

  login() {
    if (!this.username || !this.password) {
      this.mytost.warning('Username and password cannot be empty');
      return;
    }
    let user = {
      email: this.username,
      password: this.password,
      role: this.isAdmin ? 'ADMIN' : 'USER',
    };

    if (this.validate.isEmail(this.username)) {
      console.log('Email');

      // Send login request to the backend
      this.authApi.login(user).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          // If the response contains the email, proceed
          if (response && response.email) {
            if (this.isAdmin) {
              localStorage.setItem('token', response.email); // Save email to localStorage
              // alert('Login successful!');
              this.mytost.success('Login successful!');

              this.router.navigateByUrl('admin-dashboard');
            } else {
              localStorage.setItem('token', response.email); // Save email to localStorage
              // alert('Login successful!');
              this.mytost.success('Login successful!');
              this.router.navigateByUrl('user-dashboard');
            }
          } else {
            console.error('Login failed: No email received');
            // alert('Login failed: No email received');
            this.mytost.error('Login failed: No email received');
          }
        },
        error: (error) => {
          console.error('Login failed:', error);

          // Handle different error statuses
          if (error.status === 400) {
            this.mytost.error(
              'Bad Request: Please check your login details and try again.'
            );
          } else if (error.status === 401) {
            // alert('Invalid email or password. Please try again.');
            this.mytost.error('Bad Request: Please check your login details and try again.');
          } else if (error.status === 403) {
            // alert('Forbidden: You do not have access to this resource.');
            this.mytost.error('Invalid email or password. Please try again.');
          } else if (error.status === 404) {
            // alert('Server not found. Please check your connection.');
            this.mytost.error('Forbidden: You do not have access to this resource.');
          } else if (error.status === 500) {
            // alert('Internal Server Error: Please try again later.');
            this.mytost.error('Internal Server Error: Please try again later.');
          } else {
            // alert('Login failed: ' + (error.error || 'Unknown error'));
            this.mytost.error('Login failed: ' + (error.error || 'Unknown error'));
          }
        },
      });
    } else {
      console.log('Invalid input: Please enter a valid email address');
      this.mytost.error('Invalid input: Please enter a valid email address');
    }
  }
}
