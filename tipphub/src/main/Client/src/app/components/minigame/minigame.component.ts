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
  isCovered : boolean = false;
  secondsPassed : number = 60;
  gameStarted : boolean = false;
  points : number = 0;
  x_vel : number = 5;
  y_vel : number = 5;
  currentUser : User | undefined;
  oneTime : boolean = true;
  showAd : boolean = false;

  constructor(private storageService : StorageService, private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data});

    let popup = interval(1000).subscribe((data) => {
      let ad = document.getElementById("ad");
      if(ad){
        ad.style.top = ad.offsetTop - 5 + "px";
        console.log(ad.offsetTop)
        //445
      }

      if(ad!.offsetTop <= 450){
        this.showAd = true;
        popup.unsubscribe()
      }
    })
  }

  startGame(){
    this.gameStarted = true;
    this.moveBall();
    let timer = interval(1000).subscribe((data) => {
      if(this.secondsPassed >= 1){
        this.secondsPassed --;
      }
      if(this.secondsPassed <= 0){
        this.endGame();
        timer.unsubscribe();
      }
    })
  }

  startBallTimer(){
    let ballTimer = interval(1000).subscribe((data) => {
      if(data === 4){
        this.resetBall();
      }
      if(!this.isVisible){
        ballTimer.unsubscribe();
      }
    });
  }

  moveBall(){
    if(this.gameStarted){
      this.isCovered = true;
      this.isVisible = true;
      this.startBallTimer();

      let mover = setInterval(()=>{
        let ball = document.getElementById('ball');
        let field = document.getElementById('field');

        if(ball && field){

          let ball_height = ball.offsetHeight;
          let ball_width = ball.offsetWidth;
          let ball_y = ball.offsetTop;
          let ball_x = ball.offsetLeft;
          let field_height = field.offsetHeight;
          let field_width = field.offsetWidth;
          let field_y = field.offsetTop;
          let field_x = field.offsetLeft;

          //set ball to random position
          if(this.oneTime){
            ball.style.top = Math.random() * (field_height - field_y) + field_y + "px";
            ball.style.left = Math.random() * (field_width - field_x) + field_x + "px";
            this.isCovered = false;
            this.oneTime = false;
          }

          // on Collision do this
          if(ball_x <= field_x || ball_x + ball_width/2 >= field_width){
            this.x_vel = this.x_vel *(-1);
          }
          if (ball_y <= field_y + 5 || ball_y + ball_height/8 >= field_height){
            this.y_vel = this.y_vel *(-1);
          }

          //move ball diagonally
          ball.style.top = ball.offsetTop + this.y_vel + "px";
          ball.style.left = ball.offsetLeft + this.x_vel + "px";
        }

        if(!this.isVisible){
          clearInterval(mover);
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
    this.isCovered = false;
    this.oneTime = true;
    let resetTimer = interval(1000).subscribe((data) => {
      if(data === 4){
        this.moveBall();
        resetTimer.unsubscribe();
      }
      if(!this.gameStarted){
        resetTimer.unsubscribe();
      }
    })
  }

  endGame(){
    this.gameStarted = false;
    this.isVisible = false;
    this.secondsPassed = 60;
    this.isCovered = false;
    this.userService.addPoints(this.currentUser?.id,this.points).subscribe()
    this.points = 0;
  }
}
