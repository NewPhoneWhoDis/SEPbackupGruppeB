import {FriendRequest} from "./FriendRequest";
import {Bet} from "./Bet";
import {BetPermission} from "./BetPermission";

export class Notification {
    id: number | undefined;
    friendRequests: Array<FriendRequest> = new Array<FriendRequest>();
    sharedBets: Array<Bet> = new Array<Bet>();
    betPermissions: Array<BetPermission> = new Array<BetPermission>();
}