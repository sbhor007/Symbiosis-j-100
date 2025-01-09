import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationsService } from '../../Services/validations.service';
import { FeedbackService } from '../../Services/feedback.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(
    private validate: ValidationsService,
    private feedbackApi: FeedbackService,
    private toaster:ToastrService
  ){}

  email: string = '';
  message: string = '';
  emailValidation: string = '';

  ngOnInit(){
    
  }

  submitFeedback() {
    // Reset email validation message before re-checking
    this.emailValidation = '';

    // Validate fields
    if (!this.email || !this.message) {
      this.toaster.warning('Please fill all the fields');
      return;
    }

    if (!this.validate.isEmail(this.email)) {
      this.emailValidation = 'Please enter a valid email address';
      return;
    }

    // Prepare the feedback object
    const feedback = {
      email: this.email,
      message: this.message,
    };

    // Call the feedback service to submit the feedback
    this.feedbackApi.submitFeedback(feedback).subscribe({
      next: (response) => {
        // Handle successful feedback submission
        this.toaster.success('Thank you for your feedback!');
        this.feedbackApi.getFeedbacks().subscribe((data) =>{})
        this.email = ''; // Reset form fields
        this.message = '';
      },
      error: (error) => {
        // Handle error during submission
        console.log(error);
        
        this.toaster.error(
          'There was an error submitting your feedback. Please try again later.' + error
        );
      },
    });
  }
}
