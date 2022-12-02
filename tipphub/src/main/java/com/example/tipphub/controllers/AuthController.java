package com.example.tipphub.controllers;

import javax.validation.Valid;

import com.example.tipphub.email.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tipphub.user.User;
import com.example.tipphub.payload.response.*;
import com.example.tipphub.payload.request.*;
import com.example.tipphub.user.UserRepository;
import com.example.tipphub.security.jwt.JwtUtils;
import com.example.tipphub.security.services.UserInfo;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailSenderService emailSenderService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserInfo userDetails = (UserInfo) authentication.getPrincipal();


        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getAdmin(),
                this.emailSenderService.sendEmail(userDetails.getEmail())
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getFirstName(), signUpRequest.getLastName(),signUpRequest.getEmail(),encoder.encode(signUpRequest.getPassword()
        ), signUpRequest.getImageURL(), signUpRequest.getDateOfBirth(), signUpRequest.isAdmin());


        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
