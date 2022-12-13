import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Betround } from 'src/app/Model/Betround';
import { BetroundService } from 'src/app/Service/betround.service';

@Component({
  selector: 'app-betround-details',
  templateUrl: './betround-details.component.html',
  styleUrls: ['./betround-details.component.css']
})
export class BetroundDetailsComponent implements OnInit {

  routeId = '';
  betrounds: Betround[] | undefined;

  constructor(private route: ActivatedRoute, private betroundService: BetroundService) { }

  ngOnInit(): void {
    /*
    this.betroundService.getAllBetrounds().subscribe(data => {
      this.betrounds = data
     });
     
     this.route.params.subscribe((params: Params) => {
      this.routeId = params['id'];
    })
    */  
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
