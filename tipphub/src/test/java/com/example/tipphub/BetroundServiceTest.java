package com.example.tipphub;

import com.example.tipphub.betround.Betround;
import com.example.tipphub.betround.BetroundController;
import com.example.tipphub.betround.BetroundRepository;
import com.example.tipphub.betround.BetroundService;
import com.example.tipphub.league.League;
import com.example.tipphub.user.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

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

        Betround betround= Mockito.mock(Betround.class);
        League league= Mockito.mock(League.class);
        User owner= Mockito.mock(User.class);

        betroundService.addNewBetround(league.getId(),owner.getId(),betround);
        Assertions.assertNotNull(betroundRepository.findById(betround.getId()).get());

    }


}
