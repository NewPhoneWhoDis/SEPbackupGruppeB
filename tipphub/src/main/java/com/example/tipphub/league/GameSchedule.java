package com.example.tipphub.league;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "gameSchedule")
public class GameSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @OneToOne(mappedBy = "gameSchedule")
    private League league;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "gameSchedule")
    private List<Gameday> gamedayList = new ArrayList<>();

    public GameSchedule() {
    }

    public GameSchedule(Long id, League league, List<Gameday> gamedayList) {
        this.id = id;
        this.league = league;
        this.gamedayList = gamedayList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public List<Gameday> getGamedayList() {
        return gamedayList;
    }

    public void setGamedayList(List<Gameday> gamedayList) {
        this.gamedayList = gamedayList;
    }
}
