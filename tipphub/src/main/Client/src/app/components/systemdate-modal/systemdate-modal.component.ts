import { Component, OnInit } from '@angular/core';
import {HubSystemService} from "../../Service/hub-system.service";
import {HubSystem} from "../../Model/HubSystem";
import {data} from "autoprefixer";

@Component({
  selector: 'app-systemdate-modal',
  templateUrl: './systemdate-modal.component.html',
  styleUrls: ['./systemdate-modal.component.css']
})
export class SystemdateModalComponent implements OnInit {
  hubSystem :  HubSystem;
  constructor(private hubSystemService : HubSystemService) {
    this.hubSystem = new HubSystem();
  }

  ngOnInit(): void {
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
