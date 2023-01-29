import {GameSchedule} from "./GameSchedule";
import {User} from "./User";
import {Team} from "./Team";

export class League{
    id: number | undefined;
    name: String | undefined;
    logoURL: String | undefined;
    gameSchedule: GameSchedule = new GameSchedule();
    topBetters: Array<string> = new Array();
    topTeams: Array<string> = new Array();
    teams: Array<Team> = new Array();
}