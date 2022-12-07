package com.example.tipphub;

import com.example.tipphub.betround.*;
import com.example.tipphub.league.League;
import com.example.tipphub.user.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;

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
    void shouldAddNewBetround() {

        User owner= Mockito.mock(User.class);
        League league= Mockito.mock(League.class);
        Bet bet= Mockito.mock(Bet.class);
        List<Bet> bets= new ArrayList<>();
        List<User> users= new ArrayList<>();
        users.add(owner);
        bets.add(bet);
        Betround betround= new Betround("round1",1,2,
                3,owner,"23",true,league,bets,users);

        betroundService.addNewBetround(league.getId(),owner.getId(),betround);
        Assertions.assertNotNull(betroundRepository.findById(betround.getId()).get());

    }


}
