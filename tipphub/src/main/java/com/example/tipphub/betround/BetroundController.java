package com.example.tipphub.betround;

import com.example.tipphub.email.EmailSenderService;
import com.example.tipphub.user.User;
import com.example.tipphub.league.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(path = "/betround")
public class BetroundController {

    private final BetroundService betroundService;
    private final EmailSenderService emailSenderService;

    @Autowired
    public BetroundController(BetroundService betroundService, EmailSenderService emailSenderService) {
        this.betroundService = betroundService;
        this.emailSenderService = emailSenderService;
    }

    @GetMapping("/all")
    public List<Betround> getAllBetrounds() {
        return betroundService.getAllBetrounds();
    }


    @GetMapping("/getAllParticipants/{id}")
    public List<User> getAllParticipants(@PathVariable Long id) {
        return betroundService.getAllParticipantsService(id);
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

    @PutMapping("/inviteGeneration/{betroundId}/{userId}/{targetetUserId}")
    public void generateInvite(@PathVariable Long betroundId, @PathVariable Long userId, @PathVariable Long targetetUserId) {
        User targetetUser = betroundService.getTargetetUser(targetetUserId);
        betroundService.generateInviteURL(betroundId, userId);
        targetetUser = betroundService.getUserById(targetetUserId);
        emailSenderService.sendEmailInviteBetround(betroundId, targetetUser.getEmail());
    }

    @GetMapping("/getInivteURL")
    public String sendInviteURL(@PathVariable("betround") Betround betround) {
        return betround.getInviteURL();
    }

    @GetMapping("/onLinkClick/{userId}/{betroundId}")
    public void saveUserInBetrounds(@PathVariable Long betroundId, @PathVariable Long userId) {
        User user = betroundService.getUserById(userId);
        Betround betround = betroundService.getBetroundById(betroundId);
        betroundService.addInvitedUserToBetround(user, betround);
        //String userEmail = betroundService.getUserEmail(userId);
        this.betroundService.sendBetroundInviteToUser(betroundId, user.getEmail());
        // invitation id as attribute
    }

    @GetMapping("/getBest/{leagueId}")
    public List<String> getBestUsersOfLeague(@PathVariable("leagueId") Long leagueId) {
        return betroundService.getBestUsersOfLeague(leagueId);
    }

    @GetMapping("/getBetHelp/{gameId}")
    public Game getBetHelp(@PathVariable("gameId") Long gameId) {
        return betroundService.getBetHelp(gameId);
    }

    @GetMapping("/getTopThreeTeams/{leagueId}")
    public List<String> getTopThreeTeams(@PathVariable Long leagueId) {
        return betroundService.getTopThreeTeams(leagueId);
    }

    @PutMapping("/setNickname/{userId}/{betroundId}")
    public void setNickname(@PathVariable Long userId, @PathVariable Long betroundId, @RequestParam String nickname){
        betroundService.setNickname(userId,betroundId,nickname);
    }

    @GetMapping("/getLeagueId/{betroundId}")
    public Long getLeaugeId(@PathVariable Long betroundId){
        return betroundService.getLeagueId(betroundId);
    }
}
