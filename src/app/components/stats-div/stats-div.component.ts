import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../../Employee';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stats-div',
  templateUrl: './stats-div.component.html',
  styleUrls: ['./stats-div.component.css']
})
export class StatsDivComponent implements OnInit {

  employees: Employee[] = [];


  

  @ViewChild('myIdentifier')myIdentifier!: ElementRef;
  @ViewChild('viewMoreBtn')viewMoreBtn!: ElementRef;
  statsDivHeight!: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      console.log(employees);
      this.employees = employees;
      this.makeFrequencyMaps();


      
    });
    setTimeout(()=>{
      var height = this.myIdentifier.nativeElement.offsetHeight;
      if(height<400){
        console.log(height,typeof(height),height<400);
        this.viewMoreBtn.nativeElement.style.display="none";
      }
      else{
          this.statsDivHeight = '401px';
      }
    },500);
    
    
  }


//maps to count frequency
departmentMap:any ;
jobTitleMap:any;
officeMap:any;

departmentArr:any;
jobTitleArr:any;
officeArr:any;


makeFrequencyMaps():void {
  this.departmentMap = new Map();
  this.jobTitleMap = new Map();
  this.officeMap = new Map();

  this.departmentArr = [];
  this.jobTitleArr = [];
  this.officeArr = [];

  for (var i = 0; i < this.employees.length; i++) {

    if (this.departmentMap.has(this.employees[i].department)) {
      this.departmentMap.set(this.employees[i].department,this.departmentMap.get(this.employees[i].department) + 1);
    } else {
      this.departmentArr.push(this.employees[i].department);
      this.departmentMap.set(this.employees[i].department, 1);
    }

    if (this.officeMap.has(this.employees[i].office)) {
      this.officeMap.set(this.employees[i].office, this.officeMap.get(this.employees[i].office) + 1);
    } else{
      this.officeArr.push(this.employees[i].office);
      this.officeMap.set(this.employees[i].office, 1);
    }

    if (this.jobTitleMap.has(this.employees[i].jobTitle)) {
      this.jobTitleMap.set(this.employees[i].jobTitle,this.jobTitleMap.get(this.employees[i].jobTitle) + 1);
    } else {
      this.jobTitleArr.push(this.employees[i].jobTitle);
      this.jobTitleMap.set(this.employees[i].jobTitle, 1);
    }

    this.caseInsensitiveSort(this.departmentArr);
    this.caseInsensitiveSort(this.officeArr);
    this.caseInsensitiveSort(this.jobTitleArr);
    console.log("offf",this.officeArr);
  }


  
}

caseInsensitiveSort(arr:any){
  arr.sort(function(a:any,b:any){
    if(a.toLowerCase()==b.toLowerCase())return 0;
    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
  });
}



  ///Sort functionality

//department sort
depAsec:boolean = true;
depSort(){
  this.departmentArr.reverse();
  this.depAsec = !this.depAsec;
}

//office sort
offAsec:boolean = true;
offSort(){
  this.officeArr.reverse();
  this.offAsec = !this.offAsec;
}

//jobTitle sort
jobAsec:boolean = true;
jobSort(){
  this.jobTitleArr.reverse();
  this.jobAsec = !this.jobAsec;
}


//view more



func(){
  var height = this.myIdentifier.nativeElement.offsetHeight;
  console.log(height);
}

viewMore() {
    

  var height = this.myIdentifier.nativeElement.offsetHeight;
  console.log(height);
  if (this.statsDivHeight != "fit-content" && height >= 399) {
    this.statsDivHeight = "fit-content";
    this.viewMoreBtn.nativeElement.innerHTML = "<b>view less</b>";
  } else {
    this.statsDivHeight = "399px";
    this.viewMoreBtn.nativeElement.innerHTML = "<b>view more</b>";
  }
  console.log(this.statsDivHeight);
}

}
