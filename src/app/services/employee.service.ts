import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../../Employee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:4999/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    console.log(this.http.get<Employee[]>(this.apiUrl));
    return this.http.get<Employee[]>(this.apiUrl);
  }

  deleteEmployee(emp: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${emp.id}`;
    return this.http.delete<Employee>(url);
  }
}
