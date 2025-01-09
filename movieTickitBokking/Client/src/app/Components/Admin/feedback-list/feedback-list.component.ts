import { Component } from '@angular/core';
import { FeedbackService } from '../../../Services/feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {
  feedbacks: any;
  constructor(private feedbackApi: FeedbackService) {

  }
  ngOnInit() {
    this.getFeedback()
    
  }

  getFeedback(){
    this.feedbackApi.getFeedbacks().subscribe((data) => {
      console.log(data);
      this.feedbacks = data
      this.feedbacks = this.feedbacks.sort((a: any, b: any) => b.updatedAt.localeCompare(a.updatedAt));
    });
  }
  
}
