package com.example.tipphub.betround;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/betround")
public class BetroundInviteController {

    private final BetroundService betroundService;

    public BetroundInviteController(BetroundService betroundService) {
        this.betroundService = betroundService;
    }

    @GetMapping("/onLinkClick/{betroundId}/{userId}")
    public String saveUserInBetrounds(@PathVariable Long betroundId, @PathVariable Long userId) {
        this.betroundService.saveUserInBetrounds(betroundId, userId);
        return "BetroundInvite";
    }
}
