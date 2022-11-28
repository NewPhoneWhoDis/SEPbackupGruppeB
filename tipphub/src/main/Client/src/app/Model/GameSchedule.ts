import {Gameday} from "./Gameday";

export class GameSchedule{
    id: number | undefined;
    gamedayList: Array<Gameday> = new Array<Gameday>();
}