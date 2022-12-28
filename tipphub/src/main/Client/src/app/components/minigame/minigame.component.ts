import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-minigame',
  templateUrl: './minigame.component.html',
  styleUrls: ['./minigame.component.css']
})
export class MinigameComponent implements OnInit {

  isVisible : boolean = false;
  secondsPassed : number = 60;
  gameStarted : boolean = false;
  points : number = 0;
  x_vel : number = 5;
  y_vel : number = 5;
  constructor() { }

  ngOnInit(): void {

  }

  startGame(){
    this.gameStarted = true;
    this.moveBall();
    let int = interval(1000).subscribe((data) => {
      if(this.secondsPassed >= 1){
        this.secondsPassed --;
      }
      if(this.secondsPassed === 0){
        this.endGame();
        int.unsubscribe();
      }
    })
  }

  startBallTimer(){
    let int = interval(1000).subscribe((data) => {
      if(data === 4){
        this.resetBall();
      }
      if(!this.isVisible){
        int.unsubscribe();
      }
    });
  }

  moveBall(){
    this.isVisible = true;
    this.startBallTimer();

    let obs = setInterval(()=>{
      let ball = document.getElementById('ball');
      let field = document.getElementById('field');

      if(ball && field){
        // on Collision do this
        let ball_height = ball.offsetHeight;
        let ball_width = ball.offsetWidth;
        let ball_top = ball.offsetTop;
        let ball_left = ball.offsetLeft;
        let field_height = field.offsetHeight;
        let field_width = field.offsetWidth;
        let field_top = field.offsetTop;
        let field_left = field.offsetLeft;

        if(ball_left <= field_left || ball_left >= field_width){
          this.x_vel = this.x_vel *(-1)
        }

        if (ball_top <= field_top || ball_top >= field_height){
          this.y_vel = this.y_vel *(-1);
        }

        //move ball diagonally
        ball.style.top = ball.offsetTop + this.y_vel + "px";
        ball.style.left = ball.offsetLeft + this.x_vel + "px";
        console.log(ball.style.top)
        console.log(ball.style.left)
      }
      if(!this.isVisible){
        clearInterval(obs);
      }
    },25)

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
    this.secondsPassed = 60;
    // todo add points to balance
    this.points = 0;
  }
}
