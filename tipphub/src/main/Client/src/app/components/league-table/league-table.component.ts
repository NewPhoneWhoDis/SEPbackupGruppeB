import { Observable } from 'rxjs';
import { LeagueService } from '../../Service/league.service';
import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../Service/storage.service";

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit {

  showPopUp: boolean = false;


  constructor(public leagueService: LeagueService,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.showPopUp = this.storageService.isCurrentUserAdmin();
  }

}
