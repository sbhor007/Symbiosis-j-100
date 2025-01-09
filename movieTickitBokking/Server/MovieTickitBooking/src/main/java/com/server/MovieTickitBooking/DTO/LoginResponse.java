package com.server.MovieTickitBooking.DTO;

public class LoginResponse {
	private String email;

    // Constructor
    public LoginResponse(String email) {
        this.email = email;
    }

    // Getter and Setter
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
