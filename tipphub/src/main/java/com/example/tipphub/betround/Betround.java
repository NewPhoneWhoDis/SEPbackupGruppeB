package com.example.tipphub.betround;

import com.example.tipphub.league.League;
import com.example.tipphub.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Betround {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private int scoreRightDiff;
    private int scoreRightWin;
    private int scoreRightResult;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id")
    private User owner;

    private String password;
    private boolean isPublic;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id", referencedColumnName = "id")
    private League league;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "betround")
    private List<Bet> bets = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "betrounds")
    @JsonIgnore
    private List<User> users = new ArrayList<>();

    public Betround() {
    }




    public Betround(String name, int scoreRightDiff, int scoreRightWin,
                    int scoreRightResult, User owner, String password,
                    boolean isPublic, League league, List<Bet> bets, List<User> users) {
        this.name = name;
        this.scoreRightDiff = scoreRightDiff;
        this.scoreRightWin = scoreRightWin;
        this.scoreRightResult = scoreRightResult;
        this.owner = owner;
        this.password = password;
        this.isPublic = isPublic;
        this.league = league;
        this.bets = bets;
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public List<Bet> getBets() {
        return bets;
    }

    public void setBets(List<Bet> bets) {
        this.bets = bets;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public int getScoreRightDiff() {
        return scoreRightDiff;
    }

    public void setScoreRightDiff(int scoreRightDiff) {
        this.scoreRightDiff = scoreRightDiff;
    }

    public int getScoreRightWin() {
        return scoreRightWin;
    }

    public void setScoreRightWin(int scoreRightWin) {
        this.scoreRightWin = scoreRightWin;
    }

    public int getScoreRightResult() {
        return scoreRightResult;
    }

    public void setScoreRightResult(int scoreRightResult) {
        this.scoreRightResult = scoreRightResult;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }
}
