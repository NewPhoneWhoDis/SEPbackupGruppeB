package com.example.tipphub.betround;

import com.example.tipphub.league.League;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

    @Entity
    @Table
    public class StatisticTeam {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String name;
        private int points;
        private int goalDifference;
        private int wins;
        private int draws;
        private int loses;

        @JsonIgnore
        @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @JoinColumn(name = "leagueId", referencedColumnName = "id")
        private League league;

        public StatisticTeam() {
        }

        public StatisticTeam(String name, int points, int goalDifference, int wins, int draws, int loses, League league) {
            this.name = name;
            this.points = points;
            this.goalDifference = goalDifference;
            this.wins = wins;
            this.draws = draws;
            this.loses = loses;
            this.league = league;
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

        public int getPoints() {
            return points;
        }

        public void setPoints(int points) {
            this.points = points;
        }

        public int getGoalDifference() {
            return goalDifference;
        }

        public void setGoalDifference(int goalDifference) {
            this.goalDifference = goalDifference;
        }

        public int getWins() {
            return wins;
        }

        public void setWins(int wins) {
            this.wins = wins;
        }

        public int getDraws() {
            return draws;
        }

        public void setDraws(int draws) {
            this.draws = draws;
        }

        public int getLoses() {
            return loses;
        }

        public void setLoses(int loses) {
            this.loses = loses;
        }

        public League getLeague() {
            return league;
        }

        public void setLeague(League league) {
            this.league = league;
        }
    }

}
