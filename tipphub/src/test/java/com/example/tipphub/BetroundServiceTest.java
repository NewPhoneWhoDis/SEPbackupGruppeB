package com.example.tipphub;

import com.example.tipphub.betround.*;
import com.example.tipphub.email.EmailSenderService;
import com.example.tipphub.hubSystem.HubSystemRepository;
import com.example.tipphub.league.*;
import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import com.example.tipphub.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;
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

    @Mock
    LeagueRepository mockLeagueRepository;

    @Mock
    BetroundRepository mockBetroundRepository;

    @Mock
    UserRepository mockUserRepository;

    @Mock
    BetRepository mockBetRepository;

    @Mock
    GameRepository mockGameRepository;

    @Mock
    BetroundNicknameRepository betroundNicknameRepository;

    @Mock
    HubSystemRepository mockHubSystemRepo;

    @Mock
    EmailSenderService mockSender;

    @Mock
    GamedayRepository mockGamedayRepo;

    @Mock
    GameScheduleRepository mockGameScheduleRepo;


    @Mock
    UserService mockUser;

    @Test
    void contextLoads() {

    }

    @Test
    @DisplayName("Test Should Pass When New Betround is added")
    public void testAddNewBetround() {


        // Set up mock behavior
        when(mockLeagueRepository.findById(anyLong())).thenReturn(Optional.of(Mockito.mock(League.class)));
        when(mockUserRepository.findById(anyLong())).thenReturn(Optional.of(Mockito.mock(User.class)));
        when(mockBetroundRepository.save(any(Betround.class))).thenReturn(Mockito.mock(Betround.class));
        when(mockBetRepository.save(any(Bet.class))).thenReturn(Mockito.mock(Bet.class));

        // Create instance of the class under test
        BetroundService service = new BetroundService(mockBetroundRepository, mockBetRepository,
                mockUserRepository, mockLeagueRepository, mockHubSystemRepo, mockGameRepository,
                mockSender, mockUser, betroundNicknameRepository);

        // Call the method under test
        service.addNewBetround(1L, 2L, Mockito.mock(Betround.class));

        // Verify that the mock objects were called as expected
        verify(mockLeagueRepository, times(1)).findById(1L);
        verify(mockUserRepository, times(1)).findById(2L);
        verify(mockBetroundRepository, times(1)).save(any(Betround.class));


    }

    @Test
    @DisplayName("Test should pass when new bettor in betround counted")
    public void testGetNumberOfBettors() {

            // Create a mock League object with a list of Betrounds
            League mockLeague = new League();
            List<Betround> betrounds = new ArrayList<>();
            mockLeague.setBetrounds(betrounds);

            // Create a mock Betround object with a list of Users
            Betround mockBetround = new Betround();
            List<User> users = new ArrayList<>();
            mockBetround.setUsers(users);

            // Add the mock Betround to the list of Betrounds
            betrounds.add(mockBetround);

            // Create a mock User object with a list of Bets
            User mockUser = new User();
            List<Bet> bets = new ArrayList<>();
            mockUser.setBets(bets);

            // Add the mock User to the list of Users
            users.add(mockUser);

            // Add a mock Bet to the list of Bets
            bets.add(new Bet());

            // Setup the mock repository to return the mock League when findById is called
            when(mockLeagueRepository.findById(1L)).thenReturn(java.util.Optional.of(mockLeague));

            // Call the method under test
        LeagueService leagueService= new LeagueService(mockLeagueRepository,mockGamedayRepo,
                mockGameScheduleRepo,mockGameRepository);
            int result = leagueService.getNumberOfBettors(1L);

            // Assert that the result is as expected
            Assertions.assertEquals(1, result);
        }




    }













