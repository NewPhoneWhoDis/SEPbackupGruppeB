import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() model: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Input() type: string = 'text';

  @Output() valuePropChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
