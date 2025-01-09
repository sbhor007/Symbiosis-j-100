import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';
import { ValidationsService } from '../../Services/validations.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OtpVerificationComponent,
    NavbarComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  imagePath: string =
    'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg';

  email: string = ''; // Email or Phone Number
  otp: string = ''; // OTP entered by the user
  newPassword: string = ''; // New password after OTP validation
  

  emailValidation: string = '';
  passwordValidation: string = '';

  constructor(
    private validate: ValidationsService,
    private router: Router,
    private authApi: AuthServiceService,
    private toastr: ToastrService
  ) {}
  onSubmit() {
    this.emailValidation = '';
    this.passwordValidation = '';
    if (!this.email || !this.newPassword) {
      alert('All fields are required!');
      return;
    }

    if (!this.validate.isEmail(this.email)) {
      this.emailValidation = 'Please enter a valid email address';
      return;
    }
    // validate password
    const validatePassword = this.validate.validatePassword(this.newPassword);
    if (!validatePassword.valid) {
      this.passwordValidation = validatePassword.messages.join(', ');
      return;
    }

    const credentials = {
      email: this.email,
      password: this.newPassword,
    };
    this.authApi.forgotPassword(credentials).subscribe({
      next: (response) => {
        this.toastr.success(response.message); // Assuming the response contains a `message`
        console.log('Password reset successful');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        if (error.status === 404) {
          this.toastr.error('User not found');
        } else if (error.status === 400) {
          this.toastr.error(error.error.error); // Assuming error.response.error
        } else {
          this.toastr.error('An error occurred, please try again later');
        }
        console.error('Password reset failed:', error);
      },
    });

    
  }
}
