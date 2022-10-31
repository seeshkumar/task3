import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../../../Employee';

@Component({
  selector: 'app-emp-card',
  templateUrl: './emp-card.component.html',
  styleUrls: ['./emp-card.component.css']
})
export class EmpCardComponent implements OnInit {

  @Input()
  employee!: Employee;
  constructor() { }

  ngOnInit(): void {
  }

}
