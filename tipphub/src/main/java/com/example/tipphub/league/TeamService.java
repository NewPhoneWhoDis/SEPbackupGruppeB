package com.example.tipphub.league;

import com.example.tipphub.betround.BetroundService;
import com.example.tipphub.hubSystem.HubSystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final LeagueRepository leagueRepository;
    private final BetroundService betroundService;
    private final HubSystemRepository hubSystemRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository,
                       LeagueRepository leagueRepository,
                       BetroundService betroundService,
                       HubSystemRepository hubSystemRepository){
        this.teamRepository = teamRepository;
        this.leagueRepository = leagueRepository;
        this.betroundService = betroundService;
        this.hubSystemRepository = hubSystemRepository;
    }

    @Transactional
    public List<Team> getAllTeams(Long leagueId){
        List<Team> result;
        League league = leagueRepository.findById(leagueId).get();
        LocalDate currentDate = hubSystemRepository.findById(1L).get().getSystemDate();

        if(league.getTeams().size() < 1){
            List<String> teamNames = betroundService.getAllTeams(leagueId);
            for(String name: teamNames){
                Team team = new Team();
                team.setName(name);
                team.setLeague(league);
                teamRepository.save(team);
                league.getTeams().add(team);
            }
        }

        for(Team team: league.getTeams()){
            team.setPoints(0);
            team.setDraws(0);
            team.setWins(0);
            team.setLoses(0);
            team.setGoalDifference(0);
            for(Gameday gameday: league.getGameSchedule().getGamedayList()){
                for (Game game: gameday.getGames()){
                    if(game.getDate().isBefore(currentDate)){
                        if (game.getHomeTeam().equals(team.getName())){
                            evaluateTeam(team,game,true);
                        }
                        if(game.getAwayTeam().equals(team.getName())){
                            evaluateTeam(team,game,false);
                        }
                    }
                }
            }
        }

        result = league.getTeams();
        Collections.sort(result, (x,y) -> {
            return x.getPoints() - y.getPoints();
        });
        Collections.reverse(result);

        return  result;
    }

    @Transactional
    public void evaluateTeam(Team team, Game game, boolean homeTeam){
        if(homeTeam){
            if(game.getScoreHomeTeam() > game.getScoreAwayTeam()){
                team.setPoints(team.getPoints()+3);
                team.setWins(team.getWins()+1);
                team.setGoalDifference(team.getGoalDifference() + game.getScoreHomeTeam() - game.getScoreAwayTeam());
            }else if(game.getScoreAwayTeam() > game.getScoreHomeTeam()){
                team.setLoses(team.getLoses() + 1);
                team.setGoalDifference(team.getGoalDifference() + game.getScoreHomeTeam() - game.getScoreAwayTeam());
            }else{
                team.setDraws(team.getDraws() + 1);
                team.setPoints(team.getPoints() + 1);
            }
        }else{
            if(game.getScoreHomeTeam() < game.getScoreAwayTeam()){
                team.setPoints(team.getPoints()+3);
                team.setWins(team.getWins()+1);
                team.setGoalDifference(team.getGoalDifference() + game.getScoreAwayTeam() - game.getScoreHomeTeam());
            }else if(game.getScoreAwayTeam() < game.getScoreHomeTeam()){
                team.setLoses(team.getLoses() + 1);
                team.setGoalDifference(team.getGoalDifference() + game.getScoreAwayTeam() - game.getScoreHomeTeam());
            }else{
                team.setDraws(team.getDraws() + 1);
                team.setPoints(team.getPoints() + 1);
            }
        }
    }
}
