package com.example.tipphub.notification;

import com.example.tipphub.betround.Bet;
import com.example.tipphub.betround.Betround;
import com.example.tipphub.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "notification")
    private List<FriendRequest> friendRequests =new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "notification_bets",
            joinColumns = { @JoinColumn(name = "notification_id") },
            inverseJoinColumns = { @JoinColumn(name = "bet_id") })
    private List<Bet> sharedBets= new ArrayList<>();

    public Notification() {
    }

    public Notification(List<FriendRequest> friendRequsts, List<Bet> sharedBets) {
        this.friendRequests = friendRequsts;
        this.sharedBets = sharedBets;
    }


    public List<FriendRequest> getFriendRequests() {
        return friendRequests;
    }

    public void setFriendRequests(List<FriendRequest> friendRequsts) {
        this.friendRequests = friendRequsts;
    }

    public List<Bet> getSharedBets() {
        return sharedBets;
    }

    public void setSharedBets(List<Bet> sharedBets) {
        this.sharedBets = sharedBets;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
