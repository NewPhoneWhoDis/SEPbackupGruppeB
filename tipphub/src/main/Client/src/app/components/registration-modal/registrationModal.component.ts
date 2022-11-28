import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "src/app/Service/registration.service";
import {RegistrationRequest} from "../../Model/RegistrationRequest";
import {Observable, Subscriber} from "rxjs";

@Component({
  selector: "registrationModal",
  templateUrl: "./registrationModal.component.html",
  styleUrls: ["./registrationModal.component.css"],
})
export class RegistrationModalComponent implements OnInit {
  registrationRequest: RegistrationRequest;
  constructor(public rs: RegistrationService) {
    this.registrationRequest = new RegistrationRequest();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.rs.addNewUser(this.registrationRequest).subscribe((data: RegistrationRequest) => {
      this.registrationRequest = data;
    });
  }

  saveImage($event: any): void {
    const file = $event.srcElement.files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file,subscriber);
    });
    observable.subscribe((d) =>{
      this.registrationRequest.imageURL = d;
    })
  }

  readFile(file: File,subscriber: Subscriber<any>){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () =>{
      subscriber.next(fileReader.result);
      subscriber.complete();
    };
    fileReader.onerror = (error) =>{
      subscriber.error(error);
      subscriber.complete();
    }
  }
}
