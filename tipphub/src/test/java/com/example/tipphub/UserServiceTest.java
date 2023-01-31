package com.example.tipphub.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Mock
    private User mockedUser;

    @Test
    public void testAddPoints() {
        Long userId = 1L;
        int points = 10;
        double originalBalance = 100;
        double expectedBalance = originalBalance + points;

        when(mockedUser.getAccountBalance()).thenReturn(originalBalance);
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockedUser));

        userService.addPoints(userId, points);

        verify(mockedUser).setAccountBalance(expectedBalance);
    }
}