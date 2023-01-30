package com.example.tipphub.betround;

import com.example.tipphub.hubSystem.HubSystemRepository;
import com.example.tipphub.league.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Service
public class StatisticTeamService {
    private final StatisticTeamRepository statisticTeamRepository;
    private final BetroundService betroundService;
    private final HubSystemRepository hubSystemRepository;
    private final BetroundRepository betroundRepository;

    @Autowired
    public StatisticTeamService(StatisticTeamRepository statisticTeamRepository,
                                BetroundService betroundService,
                                HubSystemRepository hubSystemRepository,
                                BetroundRepository betroundRepository){
        this.statisticTeamRepository = statisticTeamRepository;
        this.betroundService = betroundService;
        this.hubSystemRepository = hubSystemRepository;
        this.betroundRepository = betroundRepository;
    }

    @Transactional
    public List<StatisticTeam> getAllStatTeams(Long betroundId){
        List<StatisticTeam> result;
        Betround betround = betroundRepository.findById(betroundId).get();
        LocalDate currentDate = hubSystemRepository.findById(1L).get().getSystemDate();

        if(betround.getLeague().getTeams().size() < 1){
            List<String> teamNames = betroundService.getAllTeams(betroundId);
            for(String name: teamNames){
                StatisticTeam team = new StatisticTeam();
                team.setName(name);
                team.setLeague(betround.getLeague());
                statisticTeamRepository.save(team);
                betround.getLeague().getStatTeams().add(team);
            }
        }

        for(Team teamIterator: betround.getLeague().getTeams()){
            StatisticTeam statTeam= new StatisticTeam();
            statTeam.setPoints(0);
            statTeam.setDraws(0);
            statTeam.setWins(0);
            statTeam.setLoses(0);
            statTeam.setGoalDifference(0);
          for(Bet betIterator: betround.getBets())
                    if(betIterator.getDateOfGame().isBefore(currentDate)){
                        if (betIterator.getHomeTeam().equals(teamIterator.getName())){
                            evaluateTeam(statTeam,betIterator,true);
                        }
                        if(betIterator.getAwayTeam().equals(teamIterator.getName())){
                            evaluateTeam(statTeam,betIterator,false);
                        }
                    }
                }
        result = betround.getLeague().getStatTeams();
        Collections.sort(result, (x, y) -> {
            return x.getPoints() - y.getPoints();
        });
        Collections.reverse(result);

        return  result;
    }



    @Transactional
    public void evaluateTeam(StatisticTeam team, Bet bet, boolean homeTeam){
        if(homeTeam){
            if(bet.getHomeTeamScore() > bet.getAwayTeamScore()){
                team.setPoints(team.getPoints()+3);
                team.setWins(team.getWins()+1);
                team.setGoalDifference(team.getGoalDifference() + bet.getHomeTeamScore() - bet.getAwayTeamScore());
            }else if(bet.getAwayTeamScore() > bet.getHomeTeamScore()){
                team.setLoses(team.getLoses() + 1);
                team.setGoalDifference(team.getGoalDifference() + bet.getHomeTeamScore() - bet.getAwayTeamScore());
            }else{
                team.setDraws(team.getDraws() + 1);
                team.setPoints(team.getPoints() + 1);
            }
        }else{
            if(bet.getHomeTeamScore() < bet.getAwayTeamScore()){
                team.setPoints(team.getPoints()+3);
                team.setWins(team.getWins()+1);
                team.setGoalDifference(team.getGoalDifference() + bet.getAwayTeamScore() - bet.getHomeTeamScore());
            }else if(bet.getAwayTeamScore() < bet.getHomeTeamScore()){
                team.setLoses(team.getLoses() + 1);
                team.setGoalDifference(team.getGoalDifference() + bet.getAwayTeamScore() - bet.getHomeTeamScore());
            }else{
                team.setDraws(team.getDraws() + 1);
                team.setPoints(team.getPoints() + 1);
            }
        }
    }


}
