package com.example.tipphub.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

class UserServiceTest {
    private UserService testedService;
    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp(){
        testedService = new UserService(userRepository);
    }

    @Test
    void getFriends() {
        User user = new User(
                "Andrii",
                "DerTipper",
                "andrii.derTipper@mail.com",
                "123456",
                null,
                null,
                false

        ) ;
        testedService.getFriends(user.getId());

        verify(this.userRepository.findAll());
    }

    @Test
    void addFriend() {

    }
}