import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../../Employee';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {


  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => (this.employees = employees));
  }

  
  

  

}
