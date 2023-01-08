package com.example.tipphub.notification;

import com.example.tipphub.betround.Bet;
import com.example.tipphub.betround.BetRepository;
import com.example.tipphub.email.EmailSenderService;
import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import com.example.tipphub.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
public class NotificationService {
    private NotificationRepository notificationRepository;
    private FriendRequestRepository friendRequestRepository;
    private UserRepository userRepository;
    private UserService userService;
    private BetRepository betRepository;
    private EmailSenderService emailSenderService;
    private BetPermissionRepository betPermissionRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository,
                               FriendRequestRepository friendRequestRepository,
                               UserRepository userRepository,
                               UserService userService,
                               BetRepository betRepository,
                               EmailSenderService emailSenderService,
                               BetPermissionRepository betPermissionRepository) {
        this.notificationRepository = notificationRepository;
        this.friendRequestRepository = friendRequestRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.betRepository = betRepository;
        this.emailSenderService = emailSenderService;
        this.betPermissionRepository = betPermissionRepository;
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

    @Transactional
    public void requestBetPermission(Long userId) throws Exception{
        User user = userRepository.findById(userId).get();

        List<BetPermission> betPermissions = betPermissionRepository.findAll();
        for(BetPermission betPermissionIterator: betPermissions){
            if(Objects.equals(betPermissionIterator.getUserId(), userId)){
                throw new Exception("Anfrage wurde bereits verschickt!");
            }
        }

        for (User userIterator: userRepository.findAll()){
            if(userIterator.isAdmin() && userIterator.getId() != userId){
                BetPermission betPermission = new BetPermission();
                betPermission.setFirstName(user.getFirstName());
                betPermission.setLastName(user.getLastName());
                betPermission.setUserId(userId);
                if(user.getNotification() == null){
                    Notification notification = new Notification();
                    notification.getBetPermissions().add(betPermission);
                    betPermission.setNotification(notification);
                    betPermissionRepository.save(betPermission);
                    userIterator.setNotification(notification);
                    emailSenderService.sendBetPermission(userIterator.getEmail());
                }else{
                    betPermission.setNotification(userIterator.getNotification());
                    betPermissionRepository.save(betPermission);
                    userIterator.getNotification().getBetPermissions().add(betPermission);
                    emailSenderService.sendBetPermission(userIterator.getEmail());
                }
            }
        }
    }

    @Transactional
    public void processBetPermission(Long betPermissionId, boolean permit){
        BetPermission betPermission = betPermissionRepository.findById(betPermissionId).get();
        User user = userRepository.findById(betPermission.getUserId()).get();
        List<BetPermission> betPermissions = betPermissionRepository.findAll();
        for (BetPermission betPermissionIterator: betPermissions){
            if(Objects.equals(betPermissionIterator.getUserId(), betPermission.getUserId())){
                betPermissionRepository.deleteById(betPermissionIterator.getId());
            }
        }
        if(permit){
            user.setHasBetPermission(true);
        }
    }
}
