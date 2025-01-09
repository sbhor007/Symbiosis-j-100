package com.server.MovieTickitBooking.DTO;

public class LoginDTO {
	private String email;
	private String password;
	private String role;
	
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	 @Override
	public String toString() {
		return "LoginDTO [email=" + email + ", password=" + password + ", role=" + role + "]";
	}
	public boolean isValid() {
	        return email != null && !email.isEmpty() && password != null && !password.isEmpty();
	 }
	
}
