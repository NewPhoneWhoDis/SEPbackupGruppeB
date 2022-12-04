package com.example.tipphub.betround;


import com.example.tipphub.hubSystem.HubSystemRepository;
import com.example.tipphub.league.*;
import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class BetroundService {

    private final BetroundRepository betroundRepository;
    private final BetRepository betRepository;
    private final UserRepository userRepository;
    private final LeagueRepository leagueRepository;
    private final GameRepository gameRepository;
    private final HubSystemRepository hubSystemRepository;

    @Autowired
    public BetroundService(BetroundRepository betroundRepository, BetRepository betRepository,
                           UserRepository userRepository,
                           LeagueRepository leagueRepository, HubSystemRepository hubSystemRepository, GameRepository gameRepository) {
        this.betroundRepository = betroundRepository;
        this.betRepository = betRepository;
        this.userRepository = userRepository;
        this.leagueRepository = leagueRepository;
        this.hubSystemRepository = hubSystemRepository;
        this.gameRepository = gameRepository;
    }


    @Transactional
    public List<Betround> getAllBetrounds() {
        return betroundRepository.findAll();
    }


    @Transactional
    public void addNewBetround(Long leagueOfRound, Long ownerOfRound, Betround wantedRound) {
        List<Bet> betsOfRound = wantedRound.getBets();

        League leagueOfBetround = leagueRepository.findById(leagueOfRound).get();
        wantedRound.setLeague(leagueOfBetround);

        User owner = userRepository.findById(ownerOfRound).get();
        wantedRound.setOwner(owner);

        betroundRepository.save(wantedRound);

        for (Bet bet : betsOfRound) {
            bet.setBetround(wantedRound);
            betRepository.save(bet);
        }

    }

    @Transactional
    public List<Bet> getBetsOfUserInRound(Long userId, Long wantedRound) {
        List<Bet> betsOfUser = new ArrayList<>();
        for (Bet betIterator : userRepository.findById(userId).get().getBets()) {
            if (betIterator.getBetround().getId() == wantedRound) {
                betsOfUser.add(betIterator);
            }

        }
        return betsOfUser;
    }

    @Transactional
    public int getEvaluationInRound(Long userId, Long wantedRound) {
        int evaluationOfRound = 0;
        for (Bet betOfUser : getBetsOfUserInRound(userId, wantedRound)) {
            for (Gameday gamedayIterator : leagueRepository.findById(betOfUser.getBetround()
                    .getLeague().getId()).get().getGameSchedule().getGamedayList()) {
                for (Game actualGame : gamedayIterator.getGames()) {
                    if (betOfUser.getHomeTeam().equals(actualGame.getHomeTeam()) &&
                            betOfUser.getAwayTeam().equals(actualGame.getAwayTeam()) &&
                            betOfUser.getDateOfGame().isEqual(actualGame.getDate())) {
                        if (actualGame.getScoreHomeTeam() == betOfUser.getHomeTeamScore() &&
                                actualGame.getScoreAwayTeam() == betOfUser.getAwayTeamScore()) {
                            betOfUser.setBetScore(betOfUser.getBetround().getScoreRightResult());
                            evaluationOfRound = evaluationOfRound + betOfUser.getBetScore();
                        } else if (((actualGame.getScoreHomeTeam() - actualGame.getScoreAwayTeam()) * -1) ==
                                ((betOfUser.getHomeTeamScore() - betOfUser.getAwayTeamScore()) * -1)) {
                            betOfUser.setBetScore(betOfUser.getBetround().getScoreRightDiff());
                            evaluationOfRound = evaluationOfRound + betOfUser.getBetScore();
                        } else if ((actualGame.getScoreHomeTeam() > actualGame.getScoreAwayTeam() &&
                                betOfUser.getHomeTeamScore() > betOfUser.getAwayTeamScore()) ||
                                (actualGame.getScoreHomeTeam() < actualGame.getScoreAwayTeam() &&
                                        betOfUser.getHomeTeamScore() < betOfUser.getAwayTeamScore())) {
                            betOfUser.setBetScore(betOfUser.getBetround().getScoreRightWin());
                            evaluationOfRound = evaluationOfRound + betOfUser.getBetScore();
                        } else {
                            betOfUser.setBetScore(0);
                            evaluationOfRound = evaluationOfRound + betOfUser.getBetScore();
                        }

                    }

                }
            }


        }
        return evaluationOfRound;
    }


    @Transactional
    public List<Bet> getPossibleBetsInRound(Betround betround, LocalDate dateOfDay) {
        List<Gameday> remainingGames = betround.getLeague().getGameSchedule().getGamedayList();
        List<Bet> possibleBets = new ArrayList<>();
        for (Gameday gameday : remainingGames) {
            for (Game gameIterator : gameday.getGames()) {
                if (dateOfDay.isAfter(gameIterator.getDate()) ||
                        dateOfDay.isEqual(gameIterator.getDate())) {
                    Bet gameToBet = new Bet(gameIterator.getId(), gameIterator.getHomeTeam(),
                            gameIterator.getAwayTeam(), 0,
                            0, gameIterator.getDate(), dateOfDay, betround, null);
                    betRepository.save(gameToBet);
                    possibleBets.add(gameToBet);
                }
            }
        }
        return possibleBets;
    }

    @Transactional
    public void betInRound(Long ownerId, Long betroundId, Bet wantedBet) {
        for (Bet betIterator : getPossibleBetsInRound(betroundRepository.findById(betroundId).get(),
                wantedBet.getDateOfBet())) {
            if (wantedBet.getHomeTeam().equals(betIterator.getHomeTeam()) &&
                    wantedBet.getAwayTeam().equals(betIterator.getAwayTeam()) &&
                    wantedBet.getDateOfGame().equals(betIterator.getDateOfGame())) {

                wantedBet.setBetOwner(userRepository.findById(ownerId).get());
                wantedBet.setBetround(betroundRepository.findById(betroundId).get());
                betRepository.save(wantedBet);

                List<Bet> userBets = userRepository.findById(ownerId).get().getBets();
                userBets.add(wantedBet);
                userRepository.findById(ownerId).get().setBets(userBets);
                return;
            }

        }
        System.out.println("Wette nicht möglich!");

    }

    @Transactional
    public Game getBetHelp(Long gameId){
        Game game = gameRepository.findById(gameId).get();
        String homeTeam = game.getHomeTeam();
        String awayTeam = game.getAwayTeam();
        int scoreHomeTeam = 0;
        int scoreAwayTeam = 0;
        List<Gameday> gamedayList = game.getGameday().getGameSchedule().getGamedayList();
        int counterHomeTeam = 0;
        int counterAwayTeam = 0;
        for (Gameday gameday: gamedayList){
            for(Game currentGame: gameday.getGames()){
                if(currentGame.getDate().isBefore(game.getDate())){
                    if(currentGame.getHomeTeam().equals(homeTeam)){
                        scoreHomeTeam += currentGame.getScoreHomeTeam();
                        counterHomeTeam += 1;
                    }
                    if(currentGame.getAwayTeam().equals(awayTeam)){
                        scoreAwayTeam += currentGame.getScoreAwayTeam();
                        counterAwayTeam +=1;
                    }
                }
            }
        }
        Game returnGame = new Game();
        if(counterHomeTeam != 0){
            int resultHomeTeam = (int) Math.round((double) scoreHomeTeam/(double) counterHomeTeam);
            returnGame.setScoreHomeTeam(resultHomeTeam);
        }
        if(counterAwayTeam != 0){
            int resultAwayTeam = (int) Math.round((double) scoreAwayTeam/(double) counterAwayTeam);
            returnGame.setScoreAwayTeam(resultAwayTeam);
        }
        returnGame.setAwayTeam(awayTeam);
        returnGame.setHomeTeam(homeTeam);
        return returnGame;
    }


}
