import { Component } from "@angular/core";
import { LeagueTableComponent } from "src/app/components/league-table/league-table.component";
import {UserService} from "../../../Service/user.service";
import {StorageService} from "../../../Service/storage.service";
import {AuthService} from "../../../Service/auth.service";
import {interval} from "rxjs";

@Component({
  selector: "homePage",
  templateUrl: "./homePage.html",
})
export class homePage {

  isLoggedIn : boolean = false;
  showAndrii : boolean = true;
  showAd: boolean = false;
  randomNum : number = 0;

  constructor(private userService: UserService,
              private storageService: StorageService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    if(this.authService.isVerified() && this.storageService.isLoggedIn()){
      this.isLoggedIn = true;
    }

    let popup = interval(100).subscribe(() => {
      let ads = document.getElementById("ad");
      if(ads){
        ads.style.top = ads.offsetTop - 1 + "px";
        console.log(ads.offsetTop)
      }

      if(ads!.offsetTop <= 450){
         this.randomNum = Math.floor(Math.random() * 2) + 1;
        this.showAd = true;
        popup.unsubscribe()
      }
    })
  }

  closePopup(){
    this.showAndrii = false;
    this.showAd = false;
  }
}
