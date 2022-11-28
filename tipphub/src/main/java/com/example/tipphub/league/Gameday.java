package com.example.tipphub.league;

import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "gameday")
public class Gameday {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private int round;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "gameday")
    private List<Game> games = new ArrayList<>();
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "gameScheduleId", referencedColumnName = "id")
    private GameSchedule gameSchedule;

    public Gameday() {
    }

    public Gameday(List<Game> games, GameSchedule gameSchedule) {
        this.games = games;
        this.gameSchedule = gameSchedule;
    }

    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }

    public GameSchedule getGameSchedule() {
        return gameSchedule;
    }

    public void setGameSchedule(GameSchedule gameSchedule) {
        this.gameSchedule = gameSchedule;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getRound() {
        return round;
    }

    public void setRound(int round) {
        this.round = round;
    }
}
