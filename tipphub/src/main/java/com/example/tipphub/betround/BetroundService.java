package com.example.tipphub.betround;


import com.example.tipphub.hubSystem.HubSystemRepository;
import com.example.tipphub.league.Game;
import com.example.tipphub.league.Gameday;
import com.example.tipphub.league.League;
import com.example.tipphub.league.LeagueRepository;
import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BetroundService {

private final BetroundRepository betroundRepository;
private final BetRepository betRepository;
private final UserRepository userRepository;
private final LeagueRepository leagueRepository;
private final HubSystemRepository hubSystemRepository;

@Autowired
    public BetroundService(BetroundRepository betroundRepository, BetRepository betRepository,
                           UserRepository userRepository,
                           LeagueRepository leagueRepository, HubSystemRepository hubSystemRepository) {
        this.betroundRepository = betroundRepository;
        this.betRepository = betRepository;
        this.userRepository = userRepository;
        this.leagueRepository= leagueRepository;
    this.hubSystemRepository = hubSystemRepository;
}


    @Transactional
    public List<Betround> getAllBetrounds(){
        return betroundRepository.findAll();
    }


 @Transactional
    public void addNewBetround(Long leagueOfRound, Long ownerOfRound, Betround wantedRound){
        List<Bet> betsOfRound = wantedRound.getBets();

        League leagueOfBetround = leagueRepository.findById(leagueOfRound).get();
        wantedRound.setLeague(leagueOfBetround);

        User owner = userRepository.findById(ownerOfRound).get();
        wantedRound.setOwner(owner);

        betroundRepository.save(wantedRound);

        for(Bet bet: betsOfRound){
            bet.setBetround(wantedRound);
            betRepository.save(bet);
        }

    }

    @Transactional
   public List<Bet> getPossibleBetsInRound(Betround betround, LocalDate dateOfDay) {
       List<Gameday> remainingGames = betround.getLeague().getGameSchedule().getGamedayList();
       List<Bet> possibleBets = new ArrayList<>();
       for (Gameday gameday : remainingGames) {
           for (Game gameIterator : gameday.getGames()) {
               if(dateOfDay.isAfter(gameIterator.getDate())||
               dateOfDay.isEqual(gameIterator.getDate())){
                   Bet gameToBet= new Bet(gameIterator.getId(),gameIterator.getHomeTeam(),
                           gameIterator.getAwayTeam(),0,
                           0,dateOfDay,betround, null);
                possibleBets.add(gameToBet);
               }
           }
       }
       return possibleBets;
   }

@Transactional
   public void betInRound(Long ownerId, Long betroundId, Bet wantedBet){
    for(Bet betIterator: getPossibleBetsInRound(betroundRepository.findById(betroundId).get(),
            wantedBet.getDate())){
    if(wantedBet.getHomeTeam().equals(betIterator.getHomeTeam())&&
    wantedBet.getAwayTeam().equals(betIterator.getAwayTeam())&&
    wantedBet.getDate().equals(betIterator.getDate())){

        List<Bet> userBets= userRepository.findById(ownerId).get().getBets();
        userBets.add(wantedBet);
        userRepository.findById(ownerId).get().setBets(userBets);

        wantedBet.setBetOwner(userRepository.findById(ownerId).get());
        wantedBet.setBetround(betroundRepository.findById(betroundId).get());
        betRepository.save(wantedBet);
       // müssen mit betrrepo arbeiten! Wette existiert schon muss nur überschrieben werden
        return;
    }
    else {
        System.out.println("Wette nicht möglich");
    }

    }

   }




}
