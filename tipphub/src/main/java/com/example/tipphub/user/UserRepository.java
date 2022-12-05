package com.example.tipphub.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
    

    @Query("SELECT u FROM User u " +
            "WHERE (:user) MEMBER OF u.friends " +
            "   AND LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "ORDER BY u.firstName")
    Page<User> findFriendOf(
            @Param("user") User user,
            @Param("searchTerm") String searchTerm,
            Pageable pageRequest);


}
