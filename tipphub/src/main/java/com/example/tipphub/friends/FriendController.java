package com.example.tipphub.friends;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class FriendController {

    @Autowired
    FriendService friendService;

    @Autowired
    SecurityService securityService;

    @PostMapping("addFriend")
    public ResponseEntity<?> addUser(@RequestParam("friendId")String friendId) throws NullPointerException{
        UserDto currentUser = securityService.getUser();
        friendService.saveFriend(currentUser,Integer.parseInt(friendId));
        return ResponseEntity.ok("Friend added successfully");
    }

    @PutMapping("deleteFriend")
    public ResponseEntity<?> deleteUser(@RequestParam("friendId")String friendId) throws NullPointerException{
        UserDto currentUser = securityService.getUser();
        friendService.saveFriend(currentUser,Integer.parseInt(friendId));
        return ResponseEntity.ok("Friend added successfully");
    }


    @GetMapping("listFriends")
    public ResponseEntity<List<User>> getFriends() {
        List<User> myFriends = friendService.getFriends();
        return new ResponseEntity<List<User>>(myFriends, HttpStatus.OK);
    }

}
