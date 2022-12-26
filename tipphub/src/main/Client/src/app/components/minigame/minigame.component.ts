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

  startGame(){
    this.gameStarted = true;
    this.moveBall();
    let int = interval(1000).subscribe(() => {
      if(this.secondsPassed >= 1){
        this.secondsPassed --;
      }
      if(this.secondsPassed === 0){
        this.endGame();
        int.unsubscribe();
      }
    })
  }

  moveBall(){
    this.isVisible = true;

    let obs = interval(1000).subscribe((data) => {
      setInterval(()=>{
      let ball = document.getElementById('ball');
      if(ball){
        ball.style.top = ball.offsetTop + 1 + "px";
        ball.style.left = ball.offsetLeft + 1 + "px";
      }
    },100)

      if(!this.isVisible){
        obs.unsubscribe();
      }
      if(data === 4){
        this.resetBall();
        obs.unsubscribe();
      }
    })
  }

  onHit(){
    this.points += 10;
    this.resetBall();
  }

  resetBall(){
    this.isVisible = false;
    let obs = interval(1000).subscribe((data) => {
      if(data === 9){
        this.moveBall();
        obs.unsubscribe();
      }
      if(!this.gameStarted){
        obs.unsubscribe();
      }
    })
  }

  endGame(){
    this.gameStarted = false;
    this.isVisible = false;
  }
}
