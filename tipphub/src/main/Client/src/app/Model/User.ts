import {Bet} from "./Bet";

import { Betround } from 'src/app/Model/Betround';
import {Notification} from "./Notification";

export class User {
  id: number | undefined;
  firstName: String | undefined;
  lastName: String | undefined;
  email: String | undefined;
  password: String | undefined;
  imageURL: String | undefined;
  dateOfBirth: Date | undefined;
  isAdmin: boolean | undefined;
  bets : Array<Bet> = new Array();
  betrounds: Array<Betround> = new Array<Betround>();
  notification: Notification | undefined;
}
