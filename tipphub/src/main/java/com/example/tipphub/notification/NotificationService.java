package com.example.tipphub.notification;

import com.example.tipphub.betround.Bet;
import com.example.tipphub.betround.BetRepository;
import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import com.example.tipphub.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class NotificationService {
    private NotificationRepository notificationRepository;
    private FriendRequestRepository friendRequestRepository;
    private UserRepository userRepository;
    private UserService userService;
    private BetRepository betRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository,
                               FriendRequestRepository friendRequestRepository,
                               UserRepository userRepository,
                               UserService userService,
                               BetRepository betRepository) {
        this.notificationRepository = notificationRepository;
        this.friendRequestRepository = friendRequestRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.betRepository = betRepository;
    }

    @Transactional
    public void sendFriendRequest(FriendRequest friendRequest, String friendEmail) throws Exception{
        User friend = userRepository.findByEmail(friendEmail).get();
        if(friend.getNotification() == null){
            Notification notification = new Notification();
            notification.getFriendRequests().add(friendRequest);
            friendRequest.setNotification(notification);
            friendRequestRepository.save(friendRequest);
            friend.setNotification(notification);
            return;
        }
        for(FriendRequest iterator: friend.getNotification().getFriendRequests()){
            if(iterator.getEmail().equals(friendRequest.getEmail())){
                throw new Exception();
            }
        }
        friendRequest.setNotification(friend.getNotification());
        friendRequestRepository.save(friendRequest);
        friend.getNotification().getFriendRequests().add(friendRequest);
    }

    @Transactional
    public void processFriendRequest(Long userId, Long friendRequestId, boolean add){
        if (add){
            FriendRequest friendRequest = friendRequestRepository.findById(friendRequestId).get();
            User user = userRepository.findById(userId).get();
            User friend = userRepository.findByEmail(friendRequest.getEmail()).get();
            userService.addFriend(user.getId(),friend.getId());
            userService.addFriend(friend.getId(), user.getId());
            friendRequestRepository.deleteById(friendRequestId);
        }else{
            friendRequestRepository.deleteById(friendRequestId);
        }
    }

    @Transactional
    public void shareBet(Long friendId, Long betId){
        User friend = userRepository.findById(friendId).get();
        Bet bet = betRepository.findById(betId).get();
        if(friend.getNotification() == null){
            Notification notification = new Notification();
            notification.getSharedBets().add(bet);
            bet.getNotifications().add(notification);
            friend.setNotification(notification);
        }
        bet.getNotifications().add(friend.getNotification());
        friend.getNotification().getSharedBets().add(bet);
    }

}
