import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  imports: [CommonModule,FormsModule],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {
   inputOtp: string = '';  // OTP entered by the user
  newPassword: string = '';  // New password after OTP verification
  confirmPassword: string = '';  // Confirm Password after OTP verification
  @Input() otp: string = '';  // OTP sent to the user's mobile number(receive forgote password cumponent)
  isOtpVerified: boolean = false;  // Track OTP verification status
  username: string = '';  // Email or phone number for password reset
  otpValidation:string = '' // OTP validation status
  passwordValidation:string = '' // Password validation status
  
  constructor(private router:Router){}
  // onSubmit(){}
  // otp verification
  verifyOtp(){
    this.otpValidation = ''
    this.passwordValidation = ''
    if(this.inputOtp === this.otp){
      this.isOtpVerified = true; 
    }else{
      this.otpValidation = 'Invalid OTP'
      this.inputOtp = ''
      alert("Invalid OTP");

      return
    }
  }
  // change new password
  changePassword(){
    if(this.newPassword === '' || this.confirmPassword === ''){
      this.passwordValidation = 'please enter password'
    }else if(this.newPassword !== this.confirmPassword){
      this.passwordValidation = 'Password does not match'
    }else if(this.newPassword === this.confirmPassword){
      alert("Password changed successfully");
      this.router.navigateByUrl('login');
    }
  }
}
