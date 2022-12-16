import {FriendRequest} from "./FriendRequest";
import {Bet} from "./Bet";

export class Notification {
    id: number | undefined;
    friendRequests: Array<FriendRequest> = new Array<FriendRequest>();
    sharedBets: Array<Bet> = new Array<Bet>()
}