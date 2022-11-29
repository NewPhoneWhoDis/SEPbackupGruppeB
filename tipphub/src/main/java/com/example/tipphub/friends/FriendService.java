package com.example.tipphub.friends;

import com.example.tipphub.security.services.UserDetailsServiceImpl;
import com.simplecoding.social.auth.SecurityService;
import com.simplecoding.social.auth.models.UserDto;
import com.example.tipphub.friends.Friend;
import com.example.tipphub.user.User;
import com.example.tipphub.friends.FriendRepository;
import com.example.tipphub.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FriendService {

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserDetailsServiceImpl securityService;

    ModelMapper modelMapper;



    public void saveFriend(UserDto userDto1, int id) throws NullPointerException{

        User user = userRepository.getOne(id);
        UserDto userDto2 = modelMapper.map(user,UserDto.class);

        Friend friend = new Friend();
        User user1 = userRepository.findByEmail(userDto1.getEmail());
        User user2 = userRepository.findByEmail(userDto2.getEmail());
        User firstuser = user1;
        User seconduser = user2;
        if(user1.getId() > user2.getId()){
            firstuser = user2;
            seconduser = user1;
        }
        if( !(friendRepository.existsByFirstUserAndSecondUser(firstuser,seconduser)) ){
            friend.setCreatedDate(new Date());
            friend.setFirstUser(firstuser);
            friend.setSecondUser(seconduser);
            friendRepository.save(friend);
        }
    }

    public List<User> getFriends(){

        UserDto currentUserDto = securityService.loadUserByEmail();
        User currentUser = userRepository.findByEmail(currentUserDto.getEmail());
        List<Friend> friendsByFirstUser = friendRepository.findByFirstUser(currentUser);
        List<Friend> friendsBySecondUser = friendRepository.findBySecondUser(currentUser);
        List<User> friendUsers = new ArrayList<>();

        /*
            suppose there are 3 users with id 1,2,3.
            if user1 add user2 as friend database record will be first user = user1 second user = user2
            if user3 add user2 as friend database record will be first user = user2 second user = user3
            it is because of lexicographical order
            while calling get friends of user 2 we need to check as a both first user and the second user
         */
        for (Friend friend : friendsByFirstUser) {
            friendUsers.add(userRepository.findByEmail(friend.getSecondUser().getId()));
        }
        for (Friend friend : friendsBySecondUser) {
            friendUsers.add(userRepository.findByEmail(friend.getFirstUser().getId()));
        }
        return friendUsers;

    }

}