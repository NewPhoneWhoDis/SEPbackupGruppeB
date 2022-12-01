package com.example.tipphub.friends;

import com.example.tipphub.friends.Friend;
import com.example.tipphub.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend,String> {

    List<Friend> findAllByUserOneIdAndStatus(String id, int status);

    List<Friend> findAllByUserOneIdAndStatusOrUserTwoIdAndStatus(String id1, int status1, String id2, int status2);

    List<Friend> findAllByUserOneIdOrUserTwoIdAndStatusNot(String id1, String id2, int status);

    Friend findByUserOneIdAndUserTwoId(String userOneId, String userTwoId);

    List<Friend> findAllByUserOneIdOrUserTwoId(String userOneId, String userTwoId);

    @Query(value = "" +
            "SELECT r FROM Friend AS r " +
            "WHERE (r.userOne.id = :id OR r.userTwo.id = :id ) " +
            "AND r.status = :status")
    List<Friend> findFriendByUserIdAndStatus(@Param(value = "id") String userId,
                                                         @Param(value = "status") int status);


    @Query(value = "" +
            "SELECT r FROM Friend AS r " +
            "WHERE ((r.userOne.id = :id1 AND r.userTwo.id = :id2) " +
            "OR ( r.userTwo.id = :id1 AND r.userOne.id = :id2)) " +
            "AND r.status = :status")
    Friend findFriendWithFriendWithStatus(@Param(value = "id1") String userOneId,
                                                      @Param(value = "id2") String userTwoId,
                                                      @Param(value = "status") int status);

    @Query(value = "" +
            "SELECT r FROM Friend AS r " +
            "WHERE ((r.userOne.id = :id1 AND r.userTwo.id = :id2) " +
            "OR ( r.userTwo.id = :id1 AND r.userOne.id = :id2)) ")
    Friend findFriendByUserOneIdAndUserTwoId(@Param(value = "id1") String userOneId,
                                                         @Param(value = "id2") String userTwoId);


    @Query(value = "" +
            "SELECT r FROM Friend AS r " +
            "WHERE (r.userOne.id = :id OR r.userTwo.id = :id) " +
            "AND r.status  NOT IN (0 , 2)")
    List<Friend> findAllNotCandidatesForFriends(@Param(value = "id") String id);

    @Query(value = "" +
            "SELECT r FROM Friend AS r " +
            "WHERE (r.userOne.id = :id OR r.userTwo.id = :id) " +
            "AND r.status= 0")
    List<Friend> findAllRequestedForFriendUsers(@Param(value = "id") String id);
}

}