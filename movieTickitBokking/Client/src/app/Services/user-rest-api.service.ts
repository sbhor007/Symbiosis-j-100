import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, throwError } from 'rxjs';
import { User } from '../Classes/user';

@Injectable({
  providedIn: 'root',
})
export class UserRestApiService {
  apiURL = 'http://localhost:7777/user';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
    observe: 'response' as 'response'
  };

  // Handle Errors
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  // Check if user exists based on email or mobile number
  isUserExists(email: string, mobileNo: number): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiURL}/user`).pipe(
      map((users) =>
        users.some((user) => user.email === email || user.mobileNo === mobileNo)
      ),
      catchError(() => of(false)) // Return false if there's an error
    );
  }

  // Store User Data
  handleRegister(user: User): Observable<HttpResponse<User>> {
    return this.http
      .post<User>(
        this.apiURL,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get all users (updated list from DB)
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiURL)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/email/${email}`).pipe(
      map(users => users),
      retry(1),
      catchError(this.handleError)
    );
  }

  getUserByMobileNo(mobileNo: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/mobileNo/${mobileNo}`).pipe(
      map(users => users),
      retry(1),
      catchError(this.handleError)
    );
  }

  getNumberOfUsers(): Observable<any> {
    return this.http.get<{ totalUsers: number }>(`${this.apiURL}/count`)
  }
  getToken() {
    return localStorage.getItem('token');
  }
}