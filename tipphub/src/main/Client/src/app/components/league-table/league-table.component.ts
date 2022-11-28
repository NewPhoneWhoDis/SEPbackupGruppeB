import { Observable } from 'rxjs';
import { LeagueService } from '../../Service/league.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit {

  appObservable = new Observable((observer) => {
    console.log('test')
    observer.next('1')
    observer.next('2')
    observer.next('3')
    observer.next('4')
  })


  constructor(public leagueService: LeagueService) {
  }

  ngOnInit(): void {
      this.appObservable.subscribe((val) => {
        console.log(val)
      })
  }

}
