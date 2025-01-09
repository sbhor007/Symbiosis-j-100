package com.server.MovieTickitBooking.Exception;

//Custom Exception for when a user is not found
public class UserNotFoundException extends RuntimeException {
 public UserNotFoundException(String message) {
     super(message);
 }
}

