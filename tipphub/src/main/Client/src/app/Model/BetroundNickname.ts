import { Betround } from "./Betround";
import { User } from "./User";

export class BetroundNickname {
    id: number | undefined;
    user: User | undefined;
    betround: Betround | undefined;
    nickname: string | undefined;
}