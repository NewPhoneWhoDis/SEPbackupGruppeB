package com.example.tipphub.betround;

import com.example.tipphub.league.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/betround")
public class BetroundController {

    private final BetroundService betroundService;

    @Autowired
    public BetroundController(BetroundService betroundService) {
        this.betroundService = betroundService;
    }


    @GetMapping("/all")
    public List<Betround> getAllBetrounds() {
        return betroundService.getAllBetrounds();
    }


    @PutMapping("/add/{leagueId}/{ownerId}")
    public void addNewBetround(@PathVariable("leagueId") Long leagueId,
                               @PathVariable("ownerId") Long ownerId,
                               @RequestBody Betround betround) {
        betroundService.addNewBetround(leagueId, ownerId, betround);
    }

    @PutMapping("/bet/{ownerId}/{betroundId}")
    public void betInRound(@PathVariable("ownerId") Long ownerId,
                           @PathVariable("betroundId") Long betroundId,
                           @RequestBody Bet bet) {
        betroundService.betInRound(ownerId, betroundId, bet);
    }

    @GetMapping("/evaluation/{ownerId}/{betroundId}")
    public int getEvaluationInRound(@PathVariable("ownerId") Long ownerId,
                                    @PathVariable("betroundId") Long betroundId) {

        return betroundService.getEvaluationInRound(ownerId, betroundId);
    }

    @GetMapping("/getBest/{leagueId}")
    public List<String> getBestUsersOfLeague(@PathVariable("leagueId") Long leagueId){
    return betroundService.getBestUsersOfLeague(leagueId);
    }
    @GetMapping("/getBetHelp/{gameId}")
    public Game getBetHelp(@PathVariable("gameId") Long gameId){
        return betroundService.getBetHelp(gameId);
    }

    @GetMapping("/getTopThreeTeams/{leagueId}")
    public List<String> getTopThreeTeams(@PathVariable Long leagueId){
        return betroundService.getTopThreeTeams(leagueId);
    }

}
