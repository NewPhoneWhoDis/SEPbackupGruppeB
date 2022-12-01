package com.example.tipphub.friends;

import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FriendServiceImpl implements FriendService {
    private final FriendRepository relationshipRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final UserValidationService userValidation;
    private final FriendValidationService relationshipValidation;

    @Autowired
    public FriendServiceImpl(FriendRepository relationshipRepository, UserRepository userRepository, ModelMapper modelMapper, UserValidationService userValidation, FriendValidationService relationshipValidation) {
        this.relationshipRepository = relationshipRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.userValidation = userValidation;
        this.relationshipValidation = relationshipValidation;
    }

    @Override
    public List<FriendServiceModel> findAllUserFriendsWithStatus(String userId) {
        List<Friend> relationshipList = this.relationshipRepository
                .findFriendByUserIdAndStatus(userId, 1);

        return relationshipList
                .stream()
                .map(relationship -> this.modelMapper
                        .map(relationship, FriendServiceModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<FriendsCandidatesViewModel> searchUsers(String loggedInUserId, String search) {
        List<User> userList = this.userRepository.findAllUsersLike(loggedInUserId, search.toLowerCase());

        List<Friend> currentUserFriendList = this.relationshipRepository
                .findAllByUserOneIdOrUserTwoId(loggedInUserId, loggedInUserId);

        return userList.stream()
                .map(currentUser -> this.modelMapper.map(currentUser, FriendsCandidatesViewModel.class))
                .map(user -> mapUser(user, currentUserFriendList))
                .collect(Collectors.toList());
    }

    @Override
    public List<FriendsCandidatesViewModel> findAllFriendCandidates(String loggedInUserId) {
        List<User> userList = this.userRepository.findAll();

        List<Friend> notCandidatesForFriends = this.relationshipRepository.findAllNotCandidatesForFriends(loggedInUserId);
        List<Friend> relationshipWithStatusZero = this.relationshipRepository.findFriendByUserIdAndStatus(loggedInUserId, 0);

        List<User> usersWithFriend = new ArrayList<>();

        notCandidatesForFriends.forEach(relationship -> {
            if (!relationship.getUserOne().getId().equals(loggedInUserId)) {
                usersWithFriend.add(relationship.getUserOne());
            } else {
                usersWithFriend.add(relationship.getUserTwo());
            }
        });

        List<FriendsCandidatesViewModel> notFriendsUserList = userList.stream()
                .filter(user -> !usersWithFriend.contains(user) && !user.getId().equals(loggedInUserId))
                .map(user -> this.modelMapper.map(user, FriendsCandidatesViewModel.class))
                .collect(Collectors.toList());


        return notFriendsUserList.stream()
                .map(user -> mapUser(user, relationshipWithStatusZero))
                .collect(Collectors.toList());
    }

    @Override
    public boolean createRequestForAddingFriend(String loggedInUserId, String friendCandidateId) throws Exception {
        User loggedInUser = this.userRepository.findById(loggedInUserId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        User friendCandidateUser = this.userRepository.findById(friendCandidateId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        Friend relationshipFromDb = this.relationshipRepository.findFriendByUserOneIdAndUserTwoId(loggedInUserId, friendCandidateId);

        if (relationshipFromDb == null) {
            Friend relationship = new Friend();
            relationship.setActionUser(loggedInUser);
            relationship.setUserOne(loggedInUser);
            relationship.setUserTwo(friendCandidateUser);
            relationship.setStatus(0);
            relationship.setTime(LocalDateTime.now());

            return this.relationshipRepository.save(relationship) != null;
        } else {
            relationshipFromDb.setActionUser(loggedInUser);
            relationshipFromDb.setStatus(0);
            relationshipFromDb.setTime(LocalDateTime.now());
            return this.relationshipRepository.save(relationshipFromDb) != null;
        }
    }

    @Override
    public boolean removeFriend(String loggedInUserId, String friendToRemoveId) throws Exception {
        return this.changeStatusAndSave(loggedInUserId, friendToRemoveId, 1, 2);
    }

    @Override
    public boolean acceptFriend(String loggedInUserId, String friendToAcceptId) throws Exception {
        return this.changeStatusAndSave(loggedInUserId, friendToAcceptId, 0, 1);
    }

    @Override
    public boolean cancelFriendshipRequest(String loggedInUserId, String friendToRejectId) throws Exception {
        return this.changeStatusAndSave(loggedInUserId, friendToRejectId, 0, 2);
    }

    private FriendsCandidatesViewModel mapUser(FriendsCandidatesViewModel user, List<Friend> relationshipList) {
        Friend relationshipWithCurrentUser = relationshipList.stream()
                .filter(relationship ->
                        relationship.getUserOne().getId().equals(user.getId()) ||
                                relationship.getUserTwo().getId().equals(user.getId()))
                .findFirst().orElse(null);

        if (relationshipWithCurrentUser != null) {
            user.setStatus(relationshipWithCurrentUser.getStatus());
            user.setStarterOfAction(relationshipWithCurrentUser.getActionUser().getId().equals(user.getId()));
        }

        return user;
    }

    private boolean changeStatusAndSave(String loggedInUserId, String friendId, int fromStatus, int toStatus) throws Exception {
        User loggedInUser = this.userRepository.findById(loggedInUserId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        User friend = this.userRepository.findById(friendId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        Friend relationship = this.relationshipRepository
                .findRelationshipWithFriendWithStatusFriend(
                        loggedInUserId, friendId, fromStatus);

        if (!relationshipValidation.isValid(relationship)) {
            throw new Exception();
        }

        relationship.setActionUser(loggedInUser);
        relationship.setStatus(toStatus);
        relationship.setTime(LocalDateTime.now());
        return this.relationshipRepository.save(relationship) != null;
    }
}