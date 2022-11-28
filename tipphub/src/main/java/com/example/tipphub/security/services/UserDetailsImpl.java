package com.example.tipphub.security.services;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;

import com.example.tipphub.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String firstName;

    private String lastName;

    private Boolean isAdmin;

    private LocalDate dateOfBirth;

    private String imageUrl;

    private String email;

    @JsonIgnore
    private String password;

    public UserDetailsImpl(Long id, String firstName, String lastName, Boolean isAdmin, LocalDate dateOfBirth, String imageUrl, String email, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName=lastName;
        this.dateOfBirth = dateOfBirth;
        this.imageUrl = imageUrl;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    public static UserDetailsImpl build(User user) {


        return new UserDetailsImpl(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.isAdmin(),
                user.getDateOfBirth(),
                user.getImageURL(),
                user.getEmail(),
                user.getPassword());
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}


