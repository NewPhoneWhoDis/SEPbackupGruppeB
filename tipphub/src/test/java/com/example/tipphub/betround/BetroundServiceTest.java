package com.example.tipphub.betround;

import com.example.tipphub.hubSystem.HubSystemRepository;
import com.example.tipphub.league.*;
import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class BetroundServiceTest {
    private BetroundService testedService;
    @Mock
    private BetroundRepository betroundRepository;

    private BetRepository betRepository;
    private UserRepository userRepository;
    private LeagueRepository leagueRepository;
    @Mock
    private GameRepository gameRepository;
    private HubSystemRepository hubSystemRepository;
    @Mock
    private LeagueService leagueService;

    @BeforeEach
    void setUp(){
        testedService = new BetroundService(betroundRepository,betRepository,userRepository,leagueRepository,hubSystemRepository,gameRepository);
    }

    @Test
    void canGetAllBetrounds() {
        //when
        testedService.getAllBetrounds();
        //then
        verify(betroundRepository).findAll();
    }

    @Disabled
    @Test
    void addNewBetround() {

        //when
        //then
    }
    /*User user = new User(
            "Andrii",
            "DerTipper",
            "andrii.derTipper@mail.com",
            "123456",
            null,
            null,
            false

    ) ;
    Betround betround = new Betround(
            "round1",
            1,
            2,
            3,
            "round11",
            user,
            "123",
            false,


            );
    Bet bet = new Bet(
            1,
            "Bad Oeynhausen",
            "Uni Due",
            0,
            0,
            null,
            null,
            betround,
            user

    );*/
    @Test
    void canGetBetHelp() {
        //when
        Game game = Mockito.mock(Game.class);
        game.setHomeTeam("HomeTeam");
        game.setAwayTeam("AwayTeam");
        game.setDate(LocalDate.parse("2020-01-08"));
        game.setScoreHomeTeam(3);
        game.setScoreAwayTeam(1);

        Game game2 = Mockito.mock(Game.class);
        game2.setHomeTeam("HomeTeam");
        game2.setAwayTeam("AwayTeam");
        game2.setDate(LocalDate.parse("2020-01-09"));
        game2.setScoreHomeTeam(1);
        game2.setScoreAwayTeam(7);

        Game game3 = Mockito.mock(Game.class);
        game3.setHomeTeam("HomeTeam");
        game3.setAwayTeam("AwayTeam");
        game3.setDate(LocalDate.parse("2020-01-10"));
        game3.setScoreHomeTeam(1);
        game3.setScoreAwayTeam(2);

        Game game4 = Mockito.mock(Game.class);
        game4.setHomeTeam("HomeTeam");
        game4.setAwayTeam("AwayTeam");
        game4.setDate(LocalDate.parse("2020-01-11"));
        game4.setScoreHomeTeam(1);
        game4.setScoreAwayTeam(1);

        List<Game> games = new ArrayList<>();
        games.add(game);
        games.add(game2);
        games.add(game3);
        games.add(game4);

        Gameday gameday = Mockito.mock(Gameday.class);
        gameday.setGames(games);

        for (Game gameIteration : gameday.getGames()){
            gameIteration.setGameday(gameday);
        }



        GameSchedule gameSchedule = Mockito.mock(GameSchedule.class);
        gameSchedule.getGamedayList().add(gameday);
        gameday.setGameSchedule(gameSchedule);


        League league = Mockito.mock(League.class);
        league.setGameSchedule(gameSchedule);

        leagueService.addNewLeague(league);

        Game actualGame = testedService.getBetHelp(game4.getId());
        //then
        //2,3
        Game resultGame = new Game();
        resultGame.setHomeTeam("HomeTeam");
        resultGame.setAwayTeam("AwayTeam");
        resultGame.setScoreHomeTeam(2);
        resultGame.setScoreAwayTeam(3);

        assertThat(actualGame).isEqualTo(resultGame);



    }
}