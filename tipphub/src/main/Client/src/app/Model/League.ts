import {GameSchedule} from "./GameSchedule";
import {User} from "./User";

export class League{
    id: number | undefined;
    name: String | undefined;
    logoURL: String | undefined;
    gameSchedule: GameSchedule = new GameSchedule();
    topBetters: Array<string> = new Array();
    topTeams: Array<string> = new Array();
}