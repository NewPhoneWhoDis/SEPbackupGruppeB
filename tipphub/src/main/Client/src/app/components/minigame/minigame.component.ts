import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-minigame',
  templateUrl: './minigame.component.html',
  styleUrls: ['./minigame.component.css']
})
export class MinigameComponent implements OnInit {

  isVisible : boolean = false;
  secondsPassed : number = 120;
  gameStarted : boolean = false;
  points : number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  onHit(){
    this.points += 10;
    this.resetBall();
    console.log("ball hit")
  }

  startGame(){
    this.gameStarted = true;
    this.isVisible = true;
    interval(1000).subscribe(() => {
      if(this.secondsPassed >= 1){
        this.secondsPassed --;
      }
    })
  }

  spawnBall(){

  }

  resetBall(){
    this.isVisible = false;
    let obs = interval(1000).subscribe((data) => {
      if(data === 9){
        console.log(data)
        this.isVisible = true;
        obs.unsubscribe()
      }
    })
  }
}
