package com.server.MovieTickitBooking.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.MovieTickitBooking.Model.Feedback;
import com.server.MovieTickitBooking.Model.User;
import com.server.MovieTickitBooking.Repository.FeedbackRepository;
import com.server.MovieTickitBooking.Repository.UserRepository;

@Service
public class FeedbackService {
	@Autowired
    private FeedbackRepository feedbackRepository;

//    @Autowired
//    private UserRepository userRepository;

 // Save feedback method
	public Feedback saveFeedback(Feedback feedback) {
        try {
            // Check if feedback with the same email already exists
            Feedback existingFeedback = feedbackRepository.findByEmail(feedback.getEmail());

            if (existingFeedback != null) {
                // Update the existing feedback
                existingFeedback.setMessage(feedback.getMessage());  // Update the message
                // You can also update other fields like timestamp or status if needed
                return feedbackRepository.save(existingFeedback);  // Save the updated feedback
            } else {
                // Save the new feedback
                return feedbackRepository.save(feedback);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while saving or updating feedback: " + e.getMessage());
        }
    }
 // Get all feedbacks
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
    
   //TODO:for future implimentation
/*
    // Create feedback for a user
    public Feedback createFeedback(Integer userId, Feedback feedback) {
    	User user = userRepository.findById(userId)
    			.orElseThrow(() -> new RuntimeException("User not found"));
    	feedback.setUser(user);
    	return feedbackRepository.save(feedback);
    }

    

    // Get feedback by ID
    public Optional<Feedback> getFeedbackById(Integer id) {
        return feedbackRepository.findById(id);
    }

    // Get feedbacks for a specific user
    public List<Feedback> getFeedbacksByUserId(Integer userId) {
        	return feedbackRepository.findByUserId(userId);
		
    }

    // Delete feedback
    public void deleteFeedback(Integer id) {
        feedbackRepository.deleteById(id);
    }
    
 */
}
