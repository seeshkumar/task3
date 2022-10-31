import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, getNgModuleById, Type } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../../Employee';
import { style } from '@angular/animations';


@Component({
  selector: 'app-emp-directory',
  templateUrl: './emp-directory.component.html',
  styleUrls: ['./emp-directory.component.css']
})
export class EmpDirectoryComponent implements OnInit {


  letters = Array.from(Array(26), (_, index) => String.fromCharCode(65 + index));

  employees: Employee[] = [];
  filteredEmployees: Employee[]  = [];


  

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      console.log(employees);
      this.employees = employees;
      this.sortEmpArr(employees);
      this.filteredEmployees = employees.slice();
    });
  }

  sortEmpArr(arr: any[]): void{
    arr.sort(function(a,b){
      if(a.firstName.toLowerCase() == b.firstName.toLowerCase()){
        return 0;
      }
      return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1;
    });
  }

  addEmp(){
    this.employees.push(this.employees[0]);
  }

  printArr(){
    console.log("emp",this.employees);
    console.log("fil",this.filteredEmployees);
  }


////////////////////////////////////////
empAsec:boolean = true;
searchBarValue:string = "";
filterByValue:string = "name";
/////////////////////////////
// Letter Indexes

//onclick clear for first letter button
letterClear() {
    this.clear();

    let i =0 ;
    for(i=0;i<26;i++){
      let btn = (<HTMLInputElement>document.getElementById('letter'+i));
      btn.style.backgroundColor='#00b1fc';
    }

  }

//display emps with firstName/lastName starting with 'letter'
letterIndex(letter: string,letterId: any) {
//close other letters
  //
  let btn = (<HTMLInputElement>document.getElementById(letterId));
  if(btn.style.backgroundColor == "black"){
    this.letterClear();
    return;
  }
  this.letterClear();

  this.filteredEmployees = this.employees.filter((emp) => {
    console.log(emp.firstName.charAt(0).toUpperCase() == letter,typeof(emp.firstName.charAt(0).toUpperCase()), typeof(letter))
    return (emp.firstName.charAt(0).toUpperCase() == letter ||emp.lastName.charAt(0).toUpperCase() == letter);
  });
  this.empAsec = true;
  btn.style.backgroundColor = "black";
}

/// Implementing search

searchFunc():void{
  if(this.searchBarValue==""){
    this.clear();
    return;
  }
  this.empAsec = true;
  this.filteredEmployees = this.employees.filter((emp) => {
    if (this.filterByValue === "name")
      return (emp.firstName.toLowerCase().includes(this.searchBarValue) ||emp.lastName.toLowerCase().includes(this.searchBarValue));
    else if (this.filterByValue === "department")
      return emp.department.toLowerCase().includes(this.searchBarValue);
    else if (this.filterByValue === "office")
      return emp.office.toLowerCase().includes(this.searchBarValue);
    else if (this.filterByValue === "jobTitle")
      return emp.jobTitle.toLowerCase().includes(this.searchBarValue);
    else
      return null;

  });
  

}
//searchbar clear func
clear():void{
  
    let i =0 ;
    for(i=0;i<26;i++){
      let btn = (<HTMLInputElement>document.getElementById('letter'+i));
      btn.style.backgroundColor='#00b1fc';
    }
  
  this.searchBarValue = "";
  this.filterByValue = "name";
  this.filteredEmployees = this.employees.slice();
  this.empAsec= true;
//  document.getElementsByClassName("letter")[0].click();
}




//emp sort func
empSort(){
  this.filteredEmployees.reverse();
  this.empAsec = !this.empAsec;
}







}
