import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validator-form',
  templateUrl: './validator-form.component.html',
  styleUrls: ['./validator-form.component.css']
})
export class ValidatorFormComponent implements OnInit {
  @Input()
  field;

  constructor() { }

  ngOnInit(): void {
  }

}
