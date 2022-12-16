package com.example.tipphub.notification;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/notification/")
public class NotificationController {
    private NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PutMapping("friendRequest")
    public void sendFriendRequest(@RequestBody FriendRequest friendRequest, @RequestParam String friendEmail) throws Exception{
        this.notificationService.sendFriendRequest(friendRequest,friendEmail);
    }

    @PutMapping("processFriendRequest/{userId}/{friendRequestId}")
    public void processFriendRequest(@PathVariable Long userId, @PathVariable Long friendRequestId, @RequestParam boolean add){
        this.notificationService.processFriendRequest(userId, friendRequestId, add);
    }

    @PutMapping("shareBet/{friendId}/{betId}")
    public void shareBet(@PathVariable Long userId, @PathVariable Long friendId, @PathVariable Long betId){
        this.notificationService.shareBet(friendId, betId);
    }
}
