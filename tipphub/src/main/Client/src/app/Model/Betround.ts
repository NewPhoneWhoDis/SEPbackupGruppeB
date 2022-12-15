import { User } from "./User";
import { Bet } from "./Bet";
import { League } from "./League";
export class Betround {
  id: number | undefined;
  name: string | undefined;
  scoreRightDiff: number | undefined;
  scoreRightWin: number | undefined;
  scoreRightResult: number | undefined;
  inviteURL: string | undefined;
  owner: User | undefined;
  password: string | undefined;
  isPublic: boolean | undefined;
  league: League = new League();
  bets: Array<Bet | undefined> | undefined;
  users: Array<User | undefined> | undefined;
}
