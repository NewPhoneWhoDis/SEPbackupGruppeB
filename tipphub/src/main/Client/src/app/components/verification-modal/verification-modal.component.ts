import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../Service/auth.service";

@Component({
  selector: 'app-verification-modal',
  templateUrl: './verification-modal.component.html',
  styleUrls: ['./verification-modal.component.css']
})
export class VerificationModalComponent implements OnInit {
  constructor(authService : AuthService) {

  }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
