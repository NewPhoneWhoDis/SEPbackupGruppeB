package com.example.tipphub.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
}
