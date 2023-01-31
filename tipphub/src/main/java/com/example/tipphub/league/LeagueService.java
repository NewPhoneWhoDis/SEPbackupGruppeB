package com.example.tipphub.league;

import com.example.tipphub.betround.Betround;
import com.example.tipphub.user.User;
import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Objects;


@Service
public class LeagueService {

    private LeagueRepository leagueRepository;
    private GamedayRepository gamedayRepository;
    private GameScheduleRepository gameScheduleRepository;
    private GameRepository gameRepository;
    private TeamService teamService;
    private static final DecimalFormat df = new DecimalFormat("0.00");

    @Autowired
    public LeagueService(LeagueRepository leagueRepository,
                         GamedayRepository gamedayRepository,
                         GameScheduleRepository gameScheduleRepository,
                         GameRepository gameRepository,
                         TeamService teamService){
        this.leagueRepository = leagueRepository;
        this.gameScheduleRepository = gameScheduleRepository;
        this.gamedayRepository = gamedayRepository;
        this.gameRepository = gameRepository;
        this.teamService = teamService;
    }

    @Transactional
    public List<League> getAllLeagues(){
        return leagueRepository.findAll();
    }

    @Transactional
    public void addNewLeague(League league){
        List<Gameday> gamedayList = league.getGameSchedule().getGamedayList();
        leagueRepository.save(league);
        GameSchedule gameSchedule = gameScheduleRepository.findById(league.getGameSchedule().getId()).get();

        for(Gameday gameday: gamedayList){
            gameday.setGameSchedule(gameSchedule);
            gamedayRepository.save(gameday);
            for(Game game: gameday.getGames()){
                game.setGameday(gameday);
                gameRepository.save(game);
            }
        }

        addOddsToGames(league.getId());
    }

    @Transactional
    public void addGame(Long leagueId, Game game){
        League league = leagueRepository.findById(leagueId).get();
        List<Gameday> gamedays = league.getGameSchedule().getGamedayList();
        for(Gameday gameday: gamedays){
            for(Game gameIterator: gameday.getGames()){
                if(game.getDate().isBefore(gameIterator.getDate())){
                    game.setGameday(gameday);
                    gameRepository.save(game);
                    return;
                }
            }
        }
        game.setGameday(gamedays.get(gamedays.size()-1));
        gameRepository.save(game);
    }
    @Transactional
    public void deleteLeague(Long leagueId){
        League league = leagueRepository.findById(leagueId).get();
        for(Gameday gameday: league.getGameSchedule().getGamedayList()){
            for(Game game: gameday.getGames()){
                Long gameId = game.getId();
                gameRepository.deleteById(gameId);
            }
            Long gamedayId = gameday.getId();
            gamedayRepository.deleteById(gamedayId);
        }
        leagueRepository.deleteById(leagueId);
    }

    public void deleteGame(Long gameId){
        gameRepository.deleteById(gameId);
    }


    @Transactional
    public void changeNameAndLogo(Long leagueId, League leagueNew) {
        League league = leagueRepository.findById(leagueId).get();
        if (!leagueNew.getName().equals("")){
            league.setName(leagueNew.getName());
        }
        if(!leagueNew.getLogoURL().equals("")){
            league.setLogoURL(leagueNew.getLogoURL());
        }
    }

    @Transactional
    public void addOddsToGames(Long leagueId){
        boolean emptyLeagueTable = true;
        List<Team> teams = teamService.getAllTeams(leagueId);
        for(Team team: teams){
            if(team.getPoints() != 0){
                emptyLeagueTable = false;
            }
        }
        League league = leagueRepository.findById(leagueId).get();
        for(Gameday gameday: league.getGameSchedule().getGamedayList()){
            for(Game game: gameday.getGames()){
                if(gameday.getRound() == 1){
                    game.setHomeTeamOdd(1.5);
                    game.setAwayTeamOdd(1.5);
                    game.setDrawOdd(1.5);
                }

                //TODO: Odds berechnen (auf Basis von 5 letzten Spielen)

                if(!emptyLeagueTable){
                    game.setDrawOdd(0);
                    for(Team team: teams){
                        if(team.getName().equals(game.getHomeTeam())){
                            double winChance = team.getWins()/(double) (team.getWins() + team.getLoses() + team.getDraws());
                            double drawChance = (team.getDraws() + 1)/(double) (team.getWins() + team.getLoses() + team.getDraws());

                            double odd = (teams.indexOf(team)+1)/10D;
                            odd += 2 - winChance;
                            odd = Double.parseDouble(df.format(odd).replace(",","."));

                            double drawOdd = game.getDrawOdd() + odd - drawChance;
                            drawOdd = Double.parseDouble(df.format(drawOdd).replace(",","."));
                            game.setHomeTeamOdd(odd);
                            game.setDrawOdd(drawOdd);
                        }
                        if(team.getName().equals(game.getAwayTeam())){
                            double winChance = team.getWins()/(double) (team.getWins() + team.getLoses() + team.getDraws());
                            double drawChance = (team.getDraws() + 1)/(double) (team.getWins() + team.getLoses() + team.getDraws());

                            double odd = (teams.indexOf(team)+1)/10D;
                            odd += 2 - winChance;
                            odd = Double.parseDouble(df.format(odd).replace(",","."));

                            double drawOdd = game.getDrawOdd() + odd - drawChance;
                            drawOdd = Double.parseDouble(df.format(drawOdd).replace(",","."));
                            game.setAwayTeamOdd(odd);
                            game.setDrawOdd(drawOdd);
                        }
                    }
                }
            }
        }
    }

    @Transactional
    public int getNumberOfBetrounds(long leagueId){
        return leagueRepository.findById(leagueId).get().getNumberOfBetrounds();
    }

    @Transactional
    public int countBetrounds(long leagueId){
        int sum= 0;
        League wantedLeague= leagueRepository.findById(leagueId).get();
        if(wantedLeague.getBetrounds().isEmpty()){
            return 0;
        }
        for(Betround roundIterator:  wantedLeague.getBetrounds()){
            sum++;
        }
        wantedLeague.setNumberOfBetrounds(sum);
        return sum;
    }

    @Transactional
    public void resetNumberOfBetrounds(long leagueId){
        leagueRepository.findById(leagueId).get().setNumberOfBetrounds(0);
    }



    @Transactional
    public int getNumberOfBettors(long leagueId){
        return leagueRepository.findById(leagueId).get().getNumberOfBettors();
    }

    @Transactional
    public int countNumberOfBettors(long leagueId){
        int sum= 0;
        League wantedLeague= leagueRepository.findById(leagueId).get();
        if(wantedLeague.getBetrounds().isEmpty()){
            return 0;
        }

        for(Betround roundIterator:  wantedLeague.getBetrounds()){
            for(User userIterator: roundIterator.getUsers()){
                if(roundIterator.getUsers().isEmpty()){
                    return 0;
                }
                else{
                    if(!(userIterator.getBets().isEmpty()))
                        sum++;
                }
            }
        }
        wantedLeague.setNumberOfBettors(sum);
        return sum;
    }

    @Transactional
    public void resetNumberOfBettors(long leagueId){
        leagueRepository.findById(leagueId).get().setNumberOfBettors(0);
    }
}