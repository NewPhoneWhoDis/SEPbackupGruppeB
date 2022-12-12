import { Component, OnInit } from '@angular/core';
import {BetroundService} from "../../Service/betround.service";

@Component({
  selector: 'app-bet-help',
  templateUrl: './bet-help.component.html',
  styleUrls: ['./bet-help.component.css']
})
export class BetHelpComponent implements OnInit {

  constructor(private betroundService: BetroundService) { }

  ngOnInit(): void {
  }

}
