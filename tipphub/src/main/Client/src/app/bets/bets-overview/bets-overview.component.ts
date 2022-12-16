import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {UserService} from "../../Service/user.service";
import {StorageService} from "../../Service/storage.service";
import {User} from "../../Model/User";
import {Bet} from "../../Model/Bet";
@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css']
})
export class BetsOverviewComponent implements OnInit {

  currentUser : User | undefined;
  allBets : Array<Bet> | undefined;
  routeId: string | null = '';
  routeNumId: number = 0;

  constructor(private router: Router, private userService : UserService, private storageService : StorageService,private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data
      console.log(this.currentUser);
      this.allBets = this.currentUser.bets;
    });
    this.routeId = this.route.snapshot.paramMap.get('id');
    if(this.routeId){
      this.routeNumId = +this.routeId;}

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
