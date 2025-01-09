package com.server.MovieTickitBooking.Model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Integer id;
    @Column(nullable = false)
    private String email;
    
/*
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;
*/
    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    
   /* @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FeedbackType type;
*/
    @Column(nullable = false )
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false,updatable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Feedback [id=" + id + ", email=" + email + ", message=" + message + ", createdAt=" + createdAt
				+ ", updatedAt=" + updatedAt + "]";
	}   
}
