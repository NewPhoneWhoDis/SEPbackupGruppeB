import { Injectable } from '@angular/core';
import {User} from "../Model/User";

const USER_KEY = 'user-authentication';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public getLoggedUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      let temp = JSON.parse(user);
      return JSON.stringify(temp.id);
    }
    return {};
  }

  saveClickedUser(user : User): void{
    window.sessionStorage.removeItem("clickedFriend");
    window.sessionStorage.setItem("clickedFriend", JSON.stringify(user));
  }

  logout(){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem("Status");
    window.sessionStorage.removeItem("clickedFriend");
    window.location.reload();
  }

  public isCurrentUserAdmin() : boolean{
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      let temp = JSON.parse(user);
      return temp.admin;
    }
    return false;
  }

  public getCode() : string{
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      let temp = JSON.parse(user);
      return temp.code;
    }
    return "";
  }
}
