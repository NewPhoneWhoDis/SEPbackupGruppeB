package com.example.tipphub.league;

import com.example.tipphub.betround.Betround;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class League {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Lob
    private String logoURL;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "gameSchedule_id", referencedColumnName = "id")
    private GameSchedule gameSchedule;

    @JsonIgnore
    @OneToMany(fetch= FetchType.LAZY, mappedBy = "league")
    private List<Betround> betrounds = new ArrayList<>();

    @Column
    int numberOfBetrounds;
    @Column
    int numberOfBettors;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "league")
    private List<Team> teams = new ArrayList<>();

    public League() {
    }

    public League(String name, String logoURL, GameSchedule gameSchedule) {
        this.name = name;
        this.logoURL = logoURL;
        this.gameSchedule = gameSchedule;
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

    public String getLogoURL() {
        return logoURL;
    }

    public void setLogoURL(String logoURL) {
        this.logoURL = logoURL;
    }

    public GameSchedule getGameSchedule() {
        return gameSchedule;
    }

    public void setGameSchedule(GameSchedule gameSchedule) {
        this.gameSchedule = gameSchedule;
    }

    public List<Betround> getBetrounds() {
        return betrounds;
    }

    public void setBetrounds(List<Betround> betrounds) {
        this.betrounds = betrounds;
    }

    public int getNumberOfBetrounds() {
        return numberOfBetrounds;
    }

    public void setNumberOfBetrounds(int numberOfBetrounds) {
        this.numberOfBetrounds = numberOfBetrounds;
    }

    public int getNumberOfBettors() {
        return numberOfBettors;
    }

    public void setNumberOfBettors(int numberOfBettors) {
        this.numberOfBettors = numberOfBettors;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }
}
