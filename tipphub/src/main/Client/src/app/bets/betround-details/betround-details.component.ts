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

  routeId: string | null = '';
  routeNumId: number = 0;
  betrounds: Betround[] | undefined;
  participantsBetround: Array<User | undefined> | undefined;
  betroundToShow: Betround = new Betround();

  constructor(private route: ActivatedRoute, private betroundService: BetroundService) { }

  ngOnInit(): void {
    this.betroundService.getAllBetrounds().subscribe(data => {
      this.betrounds = data
    });

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
    
    this.betroundService.getAllBetrounds().subscribe(data => {
      return data.map(betround  => {
        if(betround.id === this.routeNumId) {
          this.participantsBetround = betround.users;
        }
      })
    })
    
    console.log(this.participantsBetround);
  }

  /*
  getCorrectId(routeId: number) {
    let correctId;
    if(this.betrounds) {
      this.betrounds.map((betround) => {
        if(betround.id === routeId) {
          correctId = betround.id;
          //return betround.id;
        }
        //else return null;
      })

      
    }
  }
  */

}
