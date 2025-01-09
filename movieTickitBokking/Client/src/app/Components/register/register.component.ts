import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserRestApiService } from '../../Services/user-rest-api.service';
import { ValidationsService } from '../../Services/validations.service';
import { MoviesService } from '../../Services/movies.service';
import { OtpVerificationComponent } from "../otp-verification/otp-verification.component";
import { AuthServiceService } from '../../Services/auth-service.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule, OtpVerificationComponent, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  // Fields for binding form input values
  fullName: string = '';
  email: string = '';
  mobileNo: number = 0;
  password: string = '';
  showNotification: boolean = false;
  isOtpSend: boolean = false;
  inputOtp:string = '';

  // Validation messages
  mobileNoValidation: string = '';
  emailValidation: string = '';
  passwordValidation:string = '';
  imagePath: string = 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg';

  //TODO:
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';


  constructor(
    private router: Router,
    private userApi: UserRestApiService,
    private validate: ValidationsService ,
    private authApi: AuthServiceService ,
    private mytost: ToastrService
  ) {}

  
  
  // Submit method to handle form submission
  async onSubmit() {
    // Clear previous validation messages
    this.mobileNoValidation = '';
    this.emailValidation = '';
    this.passwordValidation = '';

    // Validation for empty fields
    console.log('Full Name:', this.fullName);
    
    if (!this.fullName || !this.email || !this.mobileNo || !this.password) {
      // alert('All fields are required!' + this.fullName + this.email + this.mobileNo + this.password);
      this.mytost.error('All fields are required!');
      return;
    }

    // Validate mobile number
    if (!this.validate.isMobileNo(this.mobileNo)) {
      this.mobileNoValidation = 'Mobile number must be 10 digits long';
      return;
    }

    // Validate email format
    if (!this.validate.isEmail(this.email)) {
      this.emailValidation = 'Please enter a valid email address';
      return;
    }

    // validate password
    const passwordValidation = this.validate.validatePassword(this.password);
    if (!passwordValidation.valid) {
      this.passwordValidation = passwordValidation.messages.join(', ');
      return;
    }

    // Create new user object
    const newUser = {
      fullName: this.fullName,
      email: this.email,
      mobileNo: this.mobileNo,
      password: this.password,
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Register the new user
  
    this.authApi.handleRegister(newUser).subscribe({
      next: (response) => {
        // Successfully registered
        console.log('Registration successful:', response);
    
        // If the backend sends user data, you can log it
        console.log('Saved user data:', response); // response will be your saved user object
    
        // Show success alert or notification
        this.mytost.success('Registration successful!');
    
        // You can use this to navigate to login page or show a success message
        this.router.navigate(['/login']);
      },
      error: (error) => {
        // Handle error responses from backend
        console.error('Registration failed:', error);
    
        // Error message can come from the backend directly
        if (error.status === 400) {
          // Display the specific error message from the backend
          this.mytost.error('Registration failed: ' + error.error); // error.error contains message
        } else if (error.status === 500) {
          // General error handling for 500 Internal Server Error
          this.mytost.error('An unexpected error occurred: ' + error.error);
        } else {
          // Handle any other errors (network errors, etc.)
          this.mytost.error('Registration failed due to an unknown error.');
        }
    
        // this.isOtpSend = false;
      }
    });
    


    // Clear form fields after submission
    this.fullName = '';
    this.email = '';
    this.mobileNo = 0;
    this.password = '';

  }

  // Function to toggle notification message after a few seconds
  toggleNotification() {
    setTimeout(() => {
      this.showNotification = false;
    }, 5000); // 5 seconds delay
  }

  // Fetch and update the users list after successful registration
  updateUserList() {
    this.userApi.getUsers().subscribe({
      next: (users) => {
        console.log('Updated Users List:', users);
      },
      error: (error) => {
        console.error('Error fetching updated user list:', error);
      },
    });
  }
  
  
}
