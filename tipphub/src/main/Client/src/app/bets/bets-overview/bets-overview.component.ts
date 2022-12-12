import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css']
})
export class BetsOverviewComponent implements OnInit {

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  betsCreationClick($event: Event) {
    $event.preventDefault();
    this.router.navigateByUrl('/bets-and-pieces');
  }

  betsManagementClick($event: Event) {
    $event.preventDefault();
    this.router.navigateByUrl('/bets-management');
  }
}
