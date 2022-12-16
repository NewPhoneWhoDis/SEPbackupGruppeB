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
  notification: Notification | undefined;
}
