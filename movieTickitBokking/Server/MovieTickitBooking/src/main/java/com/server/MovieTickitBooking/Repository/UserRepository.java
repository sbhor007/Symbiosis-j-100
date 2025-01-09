package com.server.MovieTickitBooking.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.server.MovieTickitBooking.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);
	boolean existsByMobileNo(Long mobileNo);
	Optional<User> findByMobileNo(Long mobileno);
//	Optional<User> validate(String email,String password);
	@Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
	Optional<User> validate(@Param("email") String email, @Param("password") String password);
}
