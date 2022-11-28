package com.example.tipphub.league;

import javax.persistence.*;

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
}
