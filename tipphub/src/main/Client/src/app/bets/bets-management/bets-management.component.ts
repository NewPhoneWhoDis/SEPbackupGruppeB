import { Router } from '@angular/router';
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

  constructor(private betround: BetroundService, private router: Router) { }

  ngOnInit(): void {
    this.betround.getAllBetrounds().subscribe(data => {
      this.betrounds = data
      console.log(data);
    });
  }

  navigateToBetroundDetails($event: Event, targetId: number | undefined) {
    $event.preventDefault();
    console.log(targetId);
    this.router.navigateByUrl('/betround-details/' + targetId);
  }

  navigateToParticipants() {

  }

  private getCorrectId(routeId: number) {
    let correctId;
    if(this.betrounds) {
      this.betrounds.map((betround) => {
        if(betround.id === routeId) {
          correctId = betround.id;
          return betround.id;
        }
        else return null;
      })
    }
  }
}
