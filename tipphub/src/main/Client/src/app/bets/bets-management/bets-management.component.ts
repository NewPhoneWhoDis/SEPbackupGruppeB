import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bets-management',
  templateUrl: './bets-management.component.html',
  styleUrls: ['./bets-management.component.css']
})
export class BetsManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  filterBetrounds(betrounds: any[], searchText: string): any[] {
    if(!betrounds) {
      return [];
    }
    if(!searchText) {
      return betrounds;
    }

    return betrounds.filter(betround => {
      return betround.name.toLocaleLowerCase() === searchText.toLocaleLowerCase();
    })
  }

}
