package com.example.tipphub.user;


import com.example.tipphub.betround.Bet;
import com.example.tipphub.betround.Betround;
import com.example.tipphub.betround.BetroundNickname;
import com.example.tipphub.notification.Notification;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Required;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "User_Entity")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String password;
    @Lob
    private String imageURL;
    private LocalDate dateOfBirth;
    private boolean isAdmin;
    private boolean hasBetPermission;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "user_betrounds",
            joinColumns = { @JoinColumn(name = "user_Entity_id") },
            inverseJoinColumns = { @JoinColumn(name = "betround_id") })
    private List<Betround> betrounds= new ArrayList<>();

    @OneToMany(fetch= FetchType.LAZY, mappedBy = "betOwner")
    private List<Bet>  bets = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "friends",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id"))

    private Set<User> friends = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "notification_id")
    private Notification notification = new Notification();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<BetroundNickname> betroundNicknames = new ArrayList<>();


    public User() {
    }

    public User(String firstName, String lastName, String email, String password, String imageURL, LocalDate dateOfBirth, boolean isAdmin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.imageURL = imageURL;
        this.dateOfBirth = dateOfBirth;
        this.isAdmin = isAdmin;
    }

    public User(String firstName, String lastName, String email, String password, String imageURL, LocalDate dateOfBirth, boolean isAdmin, List<Betround> betrounds, List<Bet> bets, Set<User> friends, boolean hasBetPermission) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.imageURL = imageURL;
        this.dateOfBirth = dateOfBirth;
        this.isAdmin = isAdmin;
        this.betrounds = betrounds;
        this.bets = bets;
        this.friends = friends;
        this.hasBetPermission = hasBetPermission;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean hasFriend(User friend) {
        return friends.contains(friend);
    }

    public void addFriend(User friend) {
        friends.add(friend);
    }

    public void removeFriend(User friend) {
        friends.remove(friend);
    }

    public Set<User> getFriends() {
        return friends;
    }

    public void setFriends(Set<User> friends) {
        this.friends = friends;
    }

    public List<Bet> getBets() {
        return bets;
    }

    public void setBets(List<Bet> bets) {
        this.bets = bets;
    }

    public List<Betround> getBetrounds() {
        return betrounds;
    }

    public void setBetrounds(List<Betround> betrounds) {
        this.betrounds = betrounds;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public List<BetroundNickname> getBetroundNicknames() {
        return betroundNicknames;
    }

    public void setBetroundNicknames(List<BetroundNickname> betroundNicknames) {
        this.betroundNicknames = betroundNicknames;
    }

    public boolean isHasBetPermission() {
        return hasBetPermission;
    }

    public void setHasBetPermission(boolean hasBetPermission) {
        this.hasBetPermission = hasBetPermission;
    }
}
