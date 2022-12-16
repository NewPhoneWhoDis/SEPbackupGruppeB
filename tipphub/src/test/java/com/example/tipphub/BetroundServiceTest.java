package com.example.tipphub;

import com.example.tipphub.betround.*;
import com.example.tipphub.email.EmailSenderService;
import com.example.tipphub.hubSystem.HubSystemRepository;
import com.example.tipphub.league.GameRepository;
import com.example.tipphub.league.League;
import com.example.tipphub.league.LeagueRepository;
import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import com.example.tipphub.user.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = TipphubApplication.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class BetroundServiceTest {

    @Autowired
    BetroundRepository betroundRepository;
    @Autowired
    BetroundController betroundController;

    @Autowired
    BetroundService betroundService;





    @Test
    void contextLoads() {

    }

    @Test
    @DisplayName("Test Should Pass When New Betround is added")
    public void testAddNewBetround() {
        // Create mock objects
        LeagueRepository mockLeagueRepository = Mockito.mock(LeagueRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        BetroundRepository mockBetroundRepository = Mockito.mock(BetroundRepository.class);
        BetRepository mockBetRepository = Mockito.mock(BetRepository.class);
        GameRepository mockGameRepository = Mockito.mock(GameRepository.class);
        HubSystemRepository mockHubSystemRepo = Mockito.mock(HubSystemRepository.class);
        EmailSenderService mockSender = Mockito.mock(EmailSenderService.class);
        UserService mockUser = Mockito.mock(UserService.class);


        // Set up mock behavior
        when(mockLeagueRepository.findById(anyLong())).thenReturn(Optional.of(Mockito.mock(League.class)));
        when(mockUserRepository.findById(anyLong())).thenReturn(Optional.of(Mockito.mock(User.class)));
        when(mockBetroundRepository.save(any(Betround.class))).thenReturn(Mockito.mock(Betround.class));
        when(mockBetRepository.save(any(Bet.class))).thenReturn(Mockito.mock(Bet.class));

        // Create instance of the class under test
        BetroundService service = new BetroundService(mockBetroundRepository, mockBetRepository,
                mockUserRepository, mockLeagueRepository, mockHubSystemRepo, mockGameRepository,
                mockSender, mockUser
        );

        // Call the method under test
        service.addNewBetround(1L, 2L, Mockito.mock(Betround.class));

        // Verify that the mock objects were called as expected
        verify(mockLeagueRepository, times(1)).findById(1L);
        verify(mockUserRepository, times(1)).findById(2L);
        verify(mockBetroundRepository, times(1)).save(any(Betround.class));


    }


}
