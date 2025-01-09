import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserRestApiService } from './user-rest-api.service';
import { User } from '../Classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiURL = 'http://localhost:7777/user';
  loginStatus: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userApi: UserRestApiService
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Handle Errors
  handleError(error: {
    error: { message: string };
    status: number;
    message: string;
  }) {
    let errorMessage = '';
    switch (error.status) {
      case 400:
        errorMessage = `Bad Request: ${error.message}`;
        break;
      case 401:
        errorMessage = `Unauthorized: ${error.message}`;
        break;
      case 403:
        errorMessage = `Forbidden: ${error.message}`;
        break;
      case 404:
        errorMessage = `Not Found: ${error.message}`;
        break;
      case 500:
        errorMessage = `Internal Server Error: ${error.message}`;
        break;
      case 0:
        errorMessage = 'Network Error: Please check your internet connection';
        break;
      default:
        errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // send OTP
  sendOtp(email: string) {
    return this.http
      .post(`${this.apiURL}/send-otp?email=${email}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  // Register User
  handleRegister(user: User): Observable<HttpResponse<User>> {
    return this.http
      .post<any>(
        this.apiURL + '/register',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //Login User

  login(credentials: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiURL}/login`,
      credentials,
      this.httpOptions
    );
  }
  //logout user
  logout(tokenName: string) {
    console.log(tokenName);

    localStorage.removeItem(tokenName);
    this.router.navigate(['/login']);
  }

  //Reset-password
  forgotPassword(credentials: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiURL}/reset-password`,
      credentials,
      this.httpOptions
    );
  }
}
