package com.server.MovieTickitBooking.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.MovieTickitBooking.DTO.LoginDTO;
import com.server.MovieTickitBooking.DTO.LoginResponse;
import com.server.MovieTickitBooking.Exception.InvalidInputException;
import com.server.MovieTickitBooking.Exception.UserAlreadyExistsException;
import com.server.MovieTickitBooking.Exception.UserNotFoundException;
import com.server.MovieTickitBooking.Model.User;
import com.server.MovieTickitBooking.Services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;


	// Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        try {
            List<User> users = userService.getAll();
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("An error occurred while fetching users: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	// Create a new user
    @PostMapping("register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException | InvalidInputException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            return new ResponseEntity<Object>("An error occurred while creating the user: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	// Get user by ID
    @GetMapping("id/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Integer userId) {
        Optional<User> user = userService.findById(userId);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

	// Get user by email
	@GetMapping("email/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		Optional<User> user = userService.findByEmail(email);
		if (user.isPresent()) {
			return new ResponseEntity<>(user.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	// Get user by mobile number
	@GetMapping("mobileNo/{mobileNo}")
	public ResponseEntity<User> getUserByMobileNo(@PathVariable Long mobileNo) {
		Optional<User> user = userService.findByMobileNo(mobileNo);
		if (user.isPresent()) {
			return new ResponseEntity<>(user.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	// Delete user by ID
	@DeleteMapping("id/{userId}")
	public ResponseEntity<Void> deleteUserById(@PathVariable Integer userId) {
		Optional<User> user = userService.findById(userId);
		if (user.isPresent()) {
			userService.deleteById(userId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	// Update user by ID
	@PutMapping("id/{userId}")
	public ResponseEntity<User> updateUserById(@PathVariable Integer userId, @RequestBody User newUser) {
		System.out.println(newUser);
		User oldUser = userService.findById(userId).orElse(null);
		if(oldUser != null) {
			oldUser.setFullName(newUser.getFullName() != null && !newUser.getFullName().isEmpty() ? newUser.getFullName() : oldUser.getFullName());
			oldUser.setEmail(newUser.getEmail() != null && !newUser.getEmail().isEmpty() ? newUser.getEmail() : oldUser.getEmail());
			oldUser.setMobileNo(newUser.getMobileNo() != null  ? newUser.getMobileNo() : oldUser.getMobileNo());
			oldUser.setPassword(newUser.getPassword() != null && !newUser.getPassword().isEmpty()  ? newUser.getPassword() : oldUser.getPassword());
		}
		
		userService.saveUser(oldUser);
		return new ResponseEntity<>(oldUser,HttpStatus.OK);
	}
	 

	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
		System.out.println(loginDTO);
	    try {
	        // Validate the input
	    	
	        if (!loginDTO.isValid()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usernames and password cannot be empty");
	        }
	        System.out.println(loginDTO);
	        // Authenticate the user
	        boolean isAuthenticated = userService.authenticateUser(loginDTO.getEmail(), loginDTO.getPassword(),loginDTO.getRole());
	        System.out.println(isAuthenticated);
	        if (isAuthenticated) {
	        	System.out.println("Authenticate");
	            // You may return a JWT token or just a success message
	            return ResponseEntity.ok().body(new LoginResponse(loginDTO.getEmail()));
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occurred: " + e.getMessage());
	    }
	}
	//reset password
	
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody LoginDTO request) {
	    try {
	        userService.resetPassword(request.getEmail(), request.getPassword());
	        return ResponseEntity.ok().body("{\"message\":\"Password Reset Successful\"}");
	    } catch (UserNotFoundException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"User not found.\"}");
	    } catch (InvalidInputException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"" + e.getMessage() + "\"}");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"An error occurred.\"}");
	    }
	}
	//no of users
	@GetMapping("count")
    public ResponseEntity<?> getTotalUsersCount() {
        try {
            long totalUsers = userService.getUserCount();
            return ResponseEntity.status(HttpStatus.OK).body("{\"totalUsers\":" + totalUsers + "}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"An error occurred while fetching user count: " + e.getMessage() + "\"}");
        }
    }

	
}
