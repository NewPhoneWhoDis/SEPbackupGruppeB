package com.example.tipphub.user;

import java.time.LocalDate;

public class UserView {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    private String imageURL;
    private LocalDate dateOfBirth;
    private boolean isMyFriend;
    private boolean isFriendOfMine;

    public UserView(User user) {
        final User profile = user;

        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.dateOfBirth = user.getDateOfBirth();
        this.isMyFriend = user.isFriendOf(profile);
        this.isFriendOfMine = user.hasFriend(profile);
        this.imageURL = user.getImageURL();
    }

}
