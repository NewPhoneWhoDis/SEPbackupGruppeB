import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Betround } from 'src/app/Model/Betround';
import { BetroundService } from 'src/app/Service/betround.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-betround-participants',
  templateUrl: './betround-participants.component.html',
  styleUrls: ['./betround-participants.component.css']
})
export class BetroundParticipantsComponent implements OnInit {

  routeId = '';
  betrounds: Betround[] | undefined;

  constructor(private route: ActivatedRoute, private betroundService: BetroundService) { }

  ngOnInit(): void {
    /*
     this.betroundService.getAllBetrounds().pipe(
      mergeMap( data => this.betrounds = data)
     ).subscribe()
     */
     this.betroundService.getAllBetrounds().subscribe(data => {
      this.betrounds = data
     });
     this.route.params.subscribe((params: Params) => {
      this.routeId = params['id'];
    })
  }

}
