package com.example.tipphub.league;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/team")
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService){
        this.teamService = teamService;
    }

    @GetMapping("/getAllTeams/{leagueId}")
    public List<Team> getAllTeams(@PathVariable Long leagueId){
        return teamService.getAllTeams(leagueId);
    }
}
