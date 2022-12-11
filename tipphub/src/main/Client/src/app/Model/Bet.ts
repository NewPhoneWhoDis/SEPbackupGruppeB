import { Betround } from "./Betround";
import { User } from "./User";

export class Bet {
    id: number | undefined;
    homeTeam: string | undefined;
    awayTeam: string | undefined;
    dateOfGame: Date | undefined;
    dateOfBet: Date | undefined;
    betScore: number | undefined;
    betround: Betround | undefined;
    betOwner: User | undefined;
}