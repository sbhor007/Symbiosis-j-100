package com.server.MovieTickitBooking.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.server.MovieTickitBooking.DTO.EmailDTO;
import com.server.MovieTickitBooking.DTO.LoginDTO;
import com.server.MovieTickitBooking.Model.User;
import com.server.MovieTickitBooking.Services.UserService;


//TODO: for future code for apply email services 
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class RegistationController {
	@Autowired
    private UserService userService;
    // Endpoint for sending OTP
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(@RequestBody EmailDTO email) {
        try {
        	System.out.println("email" + email.getEmail());
            String otp = userService.generateAndSendOTP(email.getEmail());
            System.out.println(otp);
            return ResponseEntity.ok()
                    .body("OTP sent successfully to " + email.getEmail());
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("send OTP : "+e.getMessage());
        }
    }

    // Endpoint for user registration after OTP verification
    @PostMapping("/register")
    public ResponseEntity<?> registerUser( @RequestBody User user) {
    	System.out.println("user Data : " + user.toString());
    	
        try {
            userService.registerUser(user);
            return ResponseEntity.ok()
                    .body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }
 // Endpoint for user login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO user) {
        try {
            // Authenticate user with email and password
            boolean isAuthenticated = userService.authenticateUser(user.getEmail(), user.getPassword(),user.getRole());

            if (isAuthenticated) {
                return ResponseEntity.ok().body("Login successful");
            } else {
                return ResponseEntity.status(401).body("Invalid email or password");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }
}
