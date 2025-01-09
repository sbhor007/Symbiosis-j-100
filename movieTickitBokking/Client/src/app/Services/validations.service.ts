import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }
// check given input is Email
    isEmail(email: string) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email);
    }
    // check given input is Mobile Number
    isMobileNo(mobileNo: number) {
      const mobileRegex = /^[0-9]{10}$/;
      return mobileRegex.test(mobileNo.toString());
    }

    //password validation
    
  validatePassword(password: string): { valid: boolean, messages: string[] } {
    const messages: string[] = [];
    if (password.length < 8) {
      messages.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      messages.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      messages.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      messages.push('Password must contain at least one number');
    }
    if (!/[@$!%*?&]/.test(password)) {
      messages.push('Password must contain at least one special character');
    }
    return { valid: messages.length === 0, messages };
  }

}
