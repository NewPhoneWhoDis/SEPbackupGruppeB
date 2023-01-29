package com.example.tipphub.league;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/league")
public class LeagueController {

    private final LeagueService leagueService;

    @Autowired
    public LeagueController(LeagueService leagueService){
        this.leagueService = leagueService;
    }

    @GetMapping("/all")
    public List<League> getAllLeagues(){
        return leagueService.getAllLeagues();
    }

    @PostMapping("/add")
    public void addNewLeague(@RequestBody League league){
        leagueService.addNewLeague(league);
    }

    @DeleteMapping("/deleteLeague/{leagueId}")
    public void deleteLeague(@PathVariable("leagueId") Long leagueId){
        leagueService.deleteLeague(leagueId);
    }

    @PutMapping("/addGame/{leagueId}")
    public void addGame(@PathVariable("leagueId") Long leagueId, @RequestBody Game game){
        leagueService.addGame(leagueId,game);
    }

    @DeleteMapping("/deleteGame/{gameId}")
    public void deleteGame(@PathVariable("gameId") Long gameId){
        leagueService.deleteGame(gameId);
    }


    @PutMapping("/changeNameAndLogo/{leagueId}")
    public void changeNameAndLogo(@PathVariable("leagueId")Long leagueId, @RequestBody League leagueNew){
        leagueService.changeNameAndLogo(leagueId,leagueNew);
    }
//zyklus3
    @GetMapping("/numberBetrounds/{leagueId}")
    public int getNumberOfBetrounds(@PathVariable("leagueId")Long leagueId){
       return leagueService.getNumberOfBetrounds(leagueId);
    }

    @PostMapping("/resetBetrounds/{leagueId}")
    public void resetNumberOfBetrounds(@PathVariable("leagueId")Long leagueId){
         leagueService.resetNumberOfBetrounds(leagueId);
    }

    @GetMapping("/numberBettors/{leagueId}")
    public int getNumberOfBettors(@PathVariable("leagueId")Long leagueId){
        return  leagueService.getNumberOfBettors(leagueId);
    }

    @PostMapping("/resetBettors/{leagueId}")
    public void resetNumberOfBettors(@PathVariable("leagueId")Long leagueId){
        leagueService.resetNumberOfBettors(leagueId);
    }

}