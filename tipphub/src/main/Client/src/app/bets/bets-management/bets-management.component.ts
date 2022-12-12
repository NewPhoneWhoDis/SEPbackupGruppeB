import { Betround } from './../../Model/Betround';
import { BetroundService } from './../../Service/betround.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bets-management',
  templateUrl: './bets-management.component.html',
  styleUrls: ['./bets-management.component.css']
})
export class BetsManagementComponent implements OnInit {

  searchText = '';
  betrounds: Betround[] | undefined;

  constructor(private betround: BetroundService) { }

  ngOnInit(): void {
    this.betround.getAllBetrounds().subscribe(data => {
      this.betrounds = data
    });
    console.log(this.betrounds)
  }
}
