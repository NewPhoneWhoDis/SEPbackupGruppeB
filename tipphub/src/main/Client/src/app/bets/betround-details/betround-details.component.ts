import { UserService } from './../../Service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Betround } from 'src/app/Model/Betround';
import { User } from 'src/app/Model/User';
import { BetroundService } from 'src/app/Service/betround.service';

@Component({
  selector: 'app-betround-details',
  templateUrl: './betround-details.component.html',
  styleUrls: ['./betround-details.component.css']
})
export class BetroundDetailsComponent implements OnInit {

  searchedUserBetInvite : string = "";
  matchedUser : User | undefined;
  currentUser : User | undefined;
  routeId: string | null = '';
  routeNumId: number = 0;
  betrounds: Betround[] | undefined;
  participantsBetround: Array<User | undefined> | undefined;
  betroundToShow: Betround = new Betround();

  constructor(private route: ActivatedRoute, 
    private betroundService: BetroundService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.betroundService.getAllBetrounds().subscribe(data => {
      this.betrounds = data
    });

    this.betroundService.getAllParticipants(this.routeNumId).subscribe(data => {
      this.participantsBetround = data;
    })

    this.routeId = this.route.snapshot.paramMap.get('id');
    if(this.routeId)
    this.routeNumId = +this.routeId;
    console.log('this is the route id inside betround details' + this.routeId)
    console.log('this is the number' + this.routeNumId);

    this.betroundService.getAllBetrounds().subscribe(data => {
      return data.map(betround => {
        if(betround.id === this.routeNumId)
        this.betroundToShow = betround;
        return betround;
      })
    })
  }

  sendBetroundInvite(email: string): void {
    this.userService.getUserByEmail(email).subscribe(data =>{
      this.matchedUser = data
      console.log(this.currentUser?.id,this.matchedUser?.id )
      if (this.userService.getUserById(this.matchedUser?.id)){
        this.betroundService.sendEmailInviteBetround(this.routeNumId, this.matchedUser.id as number)
      }else return;
      
    });
  }

}
