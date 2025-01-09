package com.server.MovieTickitBooking.Services;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.server.MovieTickitBooking.Exception.AuthenticationException;
import com.server.MovieTickitBooking.Exception.InvalidInputException;
import com.server.MovieTickitBooking.Exception.UserAlreadyExistsException;
import com.server.MovieTickitBooking.Exception.UserNotFoundException;
import com.server.MovieTickitBooking.Model.User;
import com.server.MovieTickitBooking.Repository.UserRepository;

@Component
public class UserService {
	
	@Autowired
	private UserRepository userRepository;	

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static String otp;
    private static long otpExpiryTime;

    private static final long OTP_VALID_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
	
    //Save user into the database
	public User saveUser(User user) {
		
		if (userRepository.existsByEmail(user.getEmail())) {
	        throw new UserAlreadyExistsException("Email already registered");
	    }
		
		if(userRepository.existsByMobileNo(user.getMobileNo())) {
			throw new UserAlreadyExistsException("Mobile No already registered");
		}
	    
	    if (!isValidEmail(user.getEmail())) {
	        throw new InvalidInputException("Invalid email format");
	    }
	    
	    if (user.getPassword() == null || user.getPassword().length() < 6) {
	        throw new InvalidInputException("Password must be at least 6 characters long");
	    }
	    if(user.getRole().equals("")) {	    	
	    	user.setRole("USER");
	    }
	    user.setPassword(passwordEncoder.encode(user.getPassword()));
//	    user.setEnabled(true);

	    // Other OTP validation and user settings...

	    return userRepository.save(user);
		
	}
	
	public List<User> getAll(){
		return userRepository.findAll();
	}
	
	public Optional<User> findById(Integer id) {
		 return userRepository.findById(id);
	}
	
	public void deleteById(Integer id){
		userRepository.deleteById(id);
	}
	
	public Optional<User> findByEmail(String email) {
	    System.out.println("service email : " + email);
	    return userRepository.findByEmail(email); // Properly return the repository call.
	}

	
	public Optional<User> findByMobileNo(Long mobileNo){
		return userRepository.findByMobileNo(mobileNo);
	}
	public Optional<User> validate(String email,String password) {
		return userRepository.validate(email, password);
	}
	
	
	private boolean isValidEmail(String email) {
	    return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
	}
	//get user count
	public long getUserCount() {
        return userRepository.count();
    }
	
	
	/*
	 * TODO:resolve issues of mail server
	 */
	// Generate and send OTP to the user's email
		public String generateAndSendOTP(String email) {
			// Check if user already exists
			if (userRepository.existsByEmail(email)) {
				throw new RuntimeException("Email already registered");
			}

			// Generate a 6-digit OTP
			 otp = String.format("%06d", new Random().nextInt(999999));
			
			otpExpiryTime = System.currentTimeMillis() + OTP_VALID_DURATION; // Set expiry time to 5 minutes from now
	        System.out.println("Generated OTP: " + otp);

			// Send OTP via email
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(email);
			message.setSubject("Your OTP for Movie Ticket Booking Registration");
			message.setText("Your OTP for registration is: " + otp + "\nValid for 5 minutes.");
			mailSender.send(message);

			// Save the temp user with OTP to the repository or another store (cache,
			// session, etc.)
			//userRepository.save(tempUser);

			return otp;
		}

		// Register the user after OTP verification
		public User registerUser(User user) {
			// Validate OTP
			
			if (user == null || !isOTPValid(user)) {
				throw new RuntimeException("Invalid OTP or OTP has expired");
			}

			// Check if user already exists
			if (userRepository.existsByEmail(user.getEmail())) {
				throw new RuntimeException("Email already registered");
			}

			// Encode password
			user.setPassword(passwordEncoder.encode(user.getPassword()));

			// Set user as enabled after successful OTP validation
//			user.setEnabled(true);
			
			//TODO:for future updates
//			user.setOtpExpiryTime(otpExpiryTime);

			// Save the user
			return userRepository.save(user);
		}

		// Validate OTP
		private boolean isOTPValid(User user) {
			System.out.println(user.getOtp() + " : " + otp);
			if (otp == null || !this.otp.equals(user.getOtp())) {
				return false;
			}
			System.out.println(System.currentTimeMillis() + " : " + otpExpiryTime);
			// Check OTP expiry
			return (System.currentTimeMillis() - otpExpiryTime) <= OTP_VALID_DURATION;
		}
		
		// Authenticate user
		 /*public boolean authenticateUser(String email, String password) {
		        User user = userRepository.findByEmail(email).orElse(null); // Assuming you have a method to find a user by email
		        if (user == null) {
		            throw new RuntimeException("User not found");
		        }

		        return passwordEncoder.matches(password, user.getPassword()); // Compare password
		    }*/
		
		public boolean authenticateUser(String email, String password,String role) {
		    try {
		        // Attempt to find the user by email
		        User user = userRepository.findByEmail(email).orElse(null);

		        if (user == null || !user.getRole().equals(role)) {
		            // User not found, throw an exception
		            throw new UserNotFoundException("User not found");
		        }
		        /*
		        if(user.getRole() != role) {
		        	throw new UserNotFoundException("User not found");
		        }*/


		        // Compare the given password with the stored password using the encoder
		        boolean isPasswordValid = passwordEncoder.matches(password, user.getPassword());
		        System.out.println(isPasswordValid);
		        // Return whether the password is valid
		        return isPasswordValid;

		    } catch (UserNotFoundException e) {
		        // Handle UserNotFoundException (if user is not found)
		        throw e;  // re-throwing the exception to propagate it
		    } catch (AuthenticationException e) {
		        // Handle AuthenticationException (if any authentication-related issue occurs)
		        // Optionally, log or re-throw the exception if needed
		        throw new AuthenticationException("Authentication failed due to invalid credentials or system error");
		    } catch (Exception e) {
		        // Handle any unexpected exception that occurs
		        // Optionally, you can log the exception here or wrap it in a custom exception
		        throw new AuthenticationException("An error occurred during authentication");
		    }
		}
		
		//TODO:debug for update
		// reset password - update password
		public void resetPassword(String email, String newPassword) {
		    // Check if the user exists
		    User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));

		    // Validate the new password (e.g., minimum length check)
		    if (newPassword == null || newPassword.length() < 6) {
		        throw new InvalidInputException("Password must be at least 6 characters long");
		    }

		    // Encode the new password
		    user.setPassword(passwordEncoder.encode(newPassword));

		    // Save the updated user in the repository
		    System.out.println("reset password : "+userRepository.save(user));

		    // Optionally, log the password reset event or keep it for auditing
		    System.out.println("Password reset successfully for user: " + email);
		}

		
		

	
	
	
}
