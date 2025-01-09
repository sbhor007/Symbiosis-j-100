package com.server.MovieTickitBooking.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.MovieTickitBooking.Model.Feedback;
import com.server.MovieTickitBooking.Services.FeedbackService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/feedbacks")
public class FeedbackController {
	@Autowired
    private FeedbackService feedbackService;
	
	@PostMapping
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback) {
		System.out.println(feedback);
        try {
            // Validate the input
            if (feedback.getEmail() == null || feedback.getEmail().isEmpty() || feedback.getMessage() == null || feedback.getMessage().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Email and message cannot be empty\"}");
            }

            // Save the feedback
            Feedback savedFeedback = feedbackService.saveFeedback(feedback);
            
            // Return success response with saved feedback
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\":\"Feedback submitted successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"An error occurred while saving feedback: " + e.getMessage() + "}");
        }
    }
	
	@GetMapping
    public ResponseEntity<?> getAllFeedbacks() {
        try {
            // Fetch all feedbacks
            return ResponseEntity.status(HttpStatus.OK).body(feedbackService.getAllFeedbacks());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"An error occurred while fetching feedbacks: " + e.getMessage() + "}");
        }
    }
}
