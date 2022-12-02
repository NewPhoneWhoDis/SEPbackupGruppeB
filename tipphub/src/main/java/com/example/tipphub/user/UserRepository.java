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
            "WHERE (:user) MEMBER OF u.friendOf " +
            "   AND LOWER(u.fullName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "ORDER BY u.fullName")
    Page<User> findFriends(
            @Param("user") User user,
            @Param("searchTerm") String searchTerm,
            Pageable pageRequest);

    @Query("SELECT p FROM User p " +
            "WHERE (:user) MEMBER OF p.friends " +
            "   AND LOWER(p.fullName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "ORDER BY p.fullName")
    Page<User> findFriendOf(
            @Param("user") User user,
            @Param("searchTerm") String searchTerm);


}
