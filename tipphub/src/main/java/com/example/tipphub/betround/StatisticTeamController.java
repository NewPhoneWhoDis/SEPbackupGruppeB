package com.example.tipphub.betround;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(path = "/StatisticTeam")
    public class StatisticTeamController {

        private final StatisticTeamService teamService;

        @Autowired
        public StatisticTeamController(StatisticTeamService teamService){
            this.teamService = teamService;
        }

        @GetMapping("/getAllTeams/{betroundId}")
        public List<StatisticTeam> getAllTeams(@PathVariable Long betroundId){

            return teamService.getAllStatTeams(betroundId);
        }
    }


