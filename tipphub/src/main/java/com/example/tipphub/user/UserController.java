package com.example.tipphub.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/friends")
    public Page<UserView> getFriends(
            User profile,
            @RequestParam(name = "searchTerm", defaultValue = "", required = false) String searchTerm,
            @PageableDefault(size = 20) Pageable pageRequest) {

        final Page<User> friends = userService.getFriends(profile, searchTerm, pageRequest);

        return friends.map(UserView::new);
    }

    @GetMapping("/friendOf")
    public Page<UserView> getFriendOf(
            User profile,
            @RequestParam(name = "searchTerm", defaultValue = "", required = false) String searchTerm,
            @PageableDefault(size = 20) Pageable pageRequest) {

        final Page<User> friendOf = userService.getFriendOf(profile, searchTerm, pageRequest);

        return friendOf.map(UserView::new);
    }

    @PutMapping("/friends/add/{id}/{friend_id}")
    public ResponseEntity<Void> addFriend(
            @PathVariable Long id, @PathVariable Long friend_id) {

        userService.addFriend(id, friend_id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/friends/remove/{id}")
    public ResponseEntity<Void> removeFriend(
            User profile, String email) {
        final User user = (User) userService.loadUserByEmail(email);
        if (null == user) {
            return ResponseEntity.notFound().build();
        }
        userService.removeFriend(profile, user);
        return ResponseEntity.ok().build();
    }
    
}
