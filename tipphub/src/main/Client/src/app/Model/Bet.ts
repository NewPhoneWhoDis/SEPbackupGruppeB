import { Betround } from "./Betround";
import { User } from "./User";

export class Bet {
    id: number | undefined;
    homeTeam: string | undefined;
    awayTeam: string | undefined;
    homeTeamScore: number | undefined;
    awayTeamScore: number | undefined;
    dateOfGame: Date | undefined;
    dateOfBet: Date | undefined;
    betScore: number | undefined;
    betround: Betround | undefined;
    betOwner: User | undefined;
    moneyBet: boolean | undefined;
    homeTeamWinner: boolean | undefined;
    awayTeamWinner: boolean | undefined;
    draw: boolean | undefined;
    amountOfMoney: number | undefined;
    profit: number | undefined;
}