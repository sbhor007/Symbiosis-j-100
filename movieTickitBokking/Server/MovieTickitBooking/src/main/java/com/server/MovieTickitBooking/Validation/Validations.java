package com.server.MovieTickitBooking.Validation;

public class Validations {
	public static boolean isValidEmail(String email) {
	    return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
	}
}
