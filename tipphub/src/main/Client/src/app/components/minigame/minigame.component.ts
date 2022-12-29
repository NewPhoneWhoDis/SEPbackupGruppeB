import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs";
import {StorageService} from "../../Service/storage.service";
import {UserService} from "../../Service/user.service";
import {User} from "../../Model/User";

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
  currentUser : User | undefined;
  oneTime : boolean = true;

  constructor(private storageService : StorageService, private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data});
  }

  startGame(){
    this.gameStarted = true;
    this.moveBall();
    let int = interval(1000).subscribe((data) => {
      if(this.secondsPassed >= 1){
        this.secondsPassed --;
      }
      if(this.secondsPassed <= 0){
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
    if(this.gameStarted){
      this.isVisible = true;
      this.startBallTimer();
      let obs = setInterval(()=>{
        let ball = document.getElementById('ball');
        let field = document.getElementById('field');

        if(ball && field){

          let ball_height = ball.offsetHeight;
          let ball_width = ball.offsetWidth;
          let ball_top = ball.offsetTop;
          let ball_left = ball.offsetLeft;
          let field_height = field.offsetHeight;
          let field_width = field.offsetWidth;
          let field_top = field.offsetTop;
          let field_left = field.offsetLeft;

          if(this.oneTime){
            ball.style.top = Math.random() * (field_height - field_top) + field_top + "px";
            ball.style.left = Math.random() * (field_width - field_left) + field_left + "px";
            this.oneTime = false;
          }

          // on Collision do this
          if(ball_left <= field_left || ball_left + ball_width/2 >= field_width){
            this.x_vel = this.x_vel *(-1)
          }
          if (ball_top <= field_top + 5 || ball_top + ball_height/8 >= field_height){
            this.y_vel = this.y_vel *(-1);
          }

          //move ball diagonally
          ball.style.top = ball.offsetTop + this.y_vel + "px";
          ball.style.left = ball.offsetLeft + this.x_vel + "px";
        }
        if(!this.isVisible){
          clearInterval(obs);
        }
      },25)
    }
  }

  onHit(){
    this.points += 10;
    this.resetBall();
  }

  resetBall(){
    this.isVisible = false;
    this.oneTime = true;
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
    this.userService.addPoints(this.currentUser?.id,this.points)
    this.points = 0;
  }
}
