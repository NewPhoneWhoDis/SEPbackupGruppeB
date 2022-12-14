import { Component, OnInit } from '@angular/core';
import {HubSystemService} from "../../Service/hub-system.service";
import {HubSystem} from "../../Model/HubSystem";
import {data} from "autoprefixer";
import {UserService} from "../../Service/user.service";
import {StorageService} from "../../Service/storage.service";
import {AuthService} from "../../Service/auth.service";
import {User} from "../../Model/User";

@Component({
  selector: 'app-systemdate-modal',
  templateUrl: './systemdate-modal.component.html',
  styleUrls: ['./systemdate-modal.component.css']
})
export class SystemdateModalComponent implements OnInit {
  hubSystem :  HubSystem;
  showPopUp: boolean = false;
  constructor(private hubSystemService : HubSystemService,
              private userService: UserService,
              private storageService: StorageService,
              private authService: AuthService) {
    this.hubSystem = new HubSystem();
  }

  ngOnInit(): void {
    if(this.authService.isVerified()) {
      this.showPopUp = this.storageService.isCurrentUserAdmin();
    }
  }

  onSubmit(){
    this.hubSystemService.changeSystemDate(1,this.hubSystem).subscribe(
        (data)=> {
          this.hubSystem = data
          window.location.reload();
        }
    );
  }

}
