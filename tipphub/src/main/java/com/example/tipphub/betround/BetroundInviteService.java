package com.example.tipphub.betround;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BetroundInviteService {

    BetroundRepository betroundRepository;

    BetroundInvite bri;

    Betround betround;

    BetroundInviteRepository betroundInviteRepository;

    @Autowired
    public BetroundInviteService(BetroundRepository betroundRepository, BetroundInviteRepository betroundInviteRepository) {
        this.betroundRepository = betroundRepository;
        this.betroundInviteRepository = betroundInviteRepository;
    }

    public String generateInviteUID(BetroundInvite bri, Betround betround) {
        String urlToGenerate = betround.getName() + betround.getId().toString();
        bri.setBetroundInviteURL(urlToGenerate);
        return bri.getBetroundInviteURL();
    }

    public String getInviteUID() {
        return generateInviteUID(bri, betround);
    }
}
