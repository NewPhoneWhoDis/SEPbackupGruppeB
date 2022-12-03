package com.example.tipphub.betround;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/betround")
public class BetroundInviteController {

    BetroundInviteService betroundInviteService;
    BetroundService betroundService;

    @Autowired
    public BetroundInviteController(BetroundInviteService betroundInviteService, BetroundService betroundService) {
        this.betroundInviteService = betroundInviteService;
        this.betroundService = betroundService;
    }

    @GetMapping("/sendInvite")
    public String sendInviteUID() {
        return betroundInviteService.getInviteUID();
    }
}
