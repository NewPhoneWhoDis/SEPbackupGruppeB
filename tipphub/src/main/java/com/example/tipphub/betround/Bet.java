package com.example.tipphub.betround;

import com.example.tipphub.user.User;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String homeTeam;
    private String awayTeam;
    int homeTeamScore;
    int awayTeamScore;
    private LocalDate date;


    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "betround_id", referencedColumnName = "id")
    private Betround betround;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private User betOwner;

    public Bet() {
    }

    public Bet(Long id, String homeTeam, String awayTeam,
               int homeTeamScore, int awayTeamScore, LocalDate date,
               Betround betround, User betOwner) {
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeTeamScore = homeTeamScore;
        this.awayTeamScore = awayTeamScore;
        this.date = date;
        this.betround = betround;
        this.betOwner = betOwner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(String homeTeam) {
        this.homeTeam = homeTeam;
    }

    public String getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(String awayTeam) {
        this.awayTeam = awayTeam;
    }

    public int getHomeTeamScore() {
        return homeTeamScore;
    }

    public void setHomeTeamScore(int homeTeamScore) {
        this.homeTeamScore = homeTeamScore;
    }

    public int getAwayTeamScore() {
        return awayTeamScore;
    }

    public void setAwayTeamScore(int awayTeamScore) {
        this.awayTeamScore = awayTeamScore;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Betround getBetround() {
        return betround;
    }

    public void setBetround(Betround betround) {
        this.betround = betround;
    }

    public User getBetOwner() {
        return betOwner;
    }

    public void setBetOwner(User betOwner) {
        this.betOwner = betOwner;
    }
}
