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
}
