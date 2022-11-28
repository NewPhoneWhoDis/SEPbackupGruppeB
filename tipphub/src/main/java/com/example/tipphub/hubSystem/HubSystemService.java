package com.example.tipphub.hubSystem;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;


@Service
public class HubSystemService {
    private final HubSystemRepository hubSystemRepository;

    @Autowired
    public HubSystemService(HubSystemRepository hubSystemRepository) {
        this.hubSystemRepository = hubSystemRepository;
    }


    public void saveDate(HubSystem hubSystem){
        hubSystemRepository.save(hubSystem);
    }

    @Transactional
    public void changeDate(Long id, HubSystem hubSystemWanted){
        HubSystem hubSystem = hubSystemRepository.findById(id).get();
        hubSystem.setSystemDate(hubSystemWanted.getSystemDate());
    }

    public LocalDate getDate(){
        HubSystem hubSystem = hubSystemRepository.findById(1L).get();
        return hubSystem.getSystemDate();
    }
}
