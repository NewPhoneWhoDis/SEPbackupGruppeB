package com.example.tipphub.friends;

import com.example.tipphub.friends.Friend;
import com.example.tipphub.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend,Integer> {

    boolean existsByFirstUserAndSecondUser(User first,User second);

    List<Friend> findByFirstUser(User user);
    List<Friend> findBySecondUser(User user);

}