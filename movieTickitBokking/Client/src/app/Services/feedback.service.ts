import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private feedbackUrl = 'http://localhost:7777/feedbacks'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.feedbackUrl, feedback);
  }

  getFeedbacks(): Observable<any> {
    return this.http.get<any>(this.feedbackUrl);
  }
  

}
