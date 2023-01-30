package com.example.tipphub.hubSystem;


import com.example.tipphub.league.League;
import com.example.tipphub.league.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;


@Service
public class HubSystemService {
    private final HubSystemRepository hubSystemRepository;
    private final LeagueService leagueService;

    @Autowired
    public HubSystemService(HubSystemRepository hubSystemRepository, LeagueService leagueService) {
        this.hubSystemRepository = hubSystemRepository;
        this.leagueService = leagueService;
    }


    public void saveDate(HubSystem hubSystem){
        hubSystemRepository.save(hubSystem);
    }

    @Transactional
    public void changeDate(Long id, HubSystem hubSystemWanted){
        HubSystem hubSystem = hubSystemRepository.findById(id).get();
        hubSystem.setSystemDate(hubSystemWanted.getSystemDate());
        List<League> leagues = leagueService.getAllLeagues();
        for(League league : leagues){
            leagueService.addOddsToGames(league.getId());
        }
    }

    public LocalDate getDate(){
        HubSystem hubSystem = hubSystemRepository.findById(1L).get();
        return hubSystem.getSystemDate();
    }
}
