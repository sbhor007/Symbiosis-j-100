package com.server.MovieTickitBooking.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.server.MovieTickitBooking.Model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
	boolean existsByEmail(String email);
	Feedback findByEmail(String email);
}
