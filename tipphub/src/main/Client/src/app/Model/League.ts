import {GameSchedule} from "./GameSchedule";

export class League{
    id: number | undefined;
    name: String | undefined;
    logoURL: String | undefined;
    gameSchedule: GameSchedule = new GameSchedule();
}