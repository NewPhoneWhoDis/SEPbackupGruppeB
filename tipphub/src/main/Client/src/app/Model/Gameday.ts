import {Game} from "./Game";

export class Gameday{
    id: number | undefined;
    round: number | undefined;
    games: Array<Game> = new Array<Game>();
}