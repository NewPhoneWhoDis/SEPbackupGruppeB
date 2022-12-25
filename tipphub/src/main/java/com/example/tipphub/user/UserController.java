package com.example.tipphub.user;

import com.example.tipphub.betround.Bet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/add")
    public void addNewUser(@RequestBody User user){
        userService.addNewUser(user);
    }

    @GetMapping("/getByUsername")
    public UserDetails loadUserByEmail(String email){
        return userService.loadUserByEmail(email);
    }

    @PostMapping("/getByEmail")
    public User getByEmail(@RequestBody User user){
        return userService.getByEmail(user.getEmail());
    }

    @GetMapping("/friends/{id}")
    public List<User> getFriends(@PathVariable Long id) {
        return userService.getFriends(id);
    }

    @PutMapping("/friends/add/{id}/{friend_id}")
    public ResponseEntity<Void> addFriend(
            @PathVariable Long id, @PathVariable Long friend_id) {

        userService.addFriend(id, friend_id);
        userService.addFriend(friend_id, id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/friends/remove/{id}/{friend_id}")
    public ResponseEntity<Void> removeFriend(
            @PathVariable Long id, @PathVariable Long friend_id) {
        userService.removeFriend(id, friend_id);
        userService.removeFriend(friend_id, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getUserById/{userId}")
    public User getUserById(@PathVariable Long userId){
        return userService.getUserById(userId);
    }

    @GetMapping("/getUserByEmail/{email}")
    public User getUserByEmail(@PathVariable String email){
        return userService.getByEmail(email);
    }

    @GetMapping("/isFriends/{userId}/{friendId}")
    public boolean isFriends(@PathVariable Long userId, @PathVariable Long friendId){
        return userService.isFriend(userId,friendId);
    }

    @GetMapping("/getBalance/{userId}")
    public int getBalance(@PathVariable Long userId){
        return userService.getUserById(userId).getBalance();
    }
}
