package com.example.tipphub.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService{

    private final UserRepository userRepository;
    private final static String EMAIL_NOT_FOUND = "User with the email: %s was not found";

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void addNewUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalStateException("Email is already in use");
        }
        userRepository.save(user);
    }

    public User getByEmail(String email) throws UsernameNotFoundException {
        return (User)userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException
                        (String.format(EMAIL_NOT_FOUND, email)));
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        return null;
    }

    @Transactional(readOnly = true)
    public Page<User> getFriends(User user, String searchTerm, Pageable pageRequest) {
        return userRepository.findFriends(user, searchTerm, pageRequest);
    }

    @Transactional(readOnly = true)
    public Page<User> getFriendOf(User user, String searchTerm, Pageable pageRequest) {
        return userRepository.findFriendOf(user, searchTerm, pageRequest);
    }

    @Transactional
    public void addFriend(Long id, Long friend_id) {
        User user = userRepository.findById(id).get();
        User friend = userRepository.findById(friend_id).get();
        if (!user.hasFriend(friend)) {
            user.addFriend(friend);
        }
    }

    @Transactional
    public void removeFriend(Long id, Long friend_id) {
        User user = userRepository.findById(id).get();
        User friend = userRepository.findById(friend_id).get();
        if (user.hasFriend(friend)) {
            user.removeFriend(friend);
        }
    }

}
