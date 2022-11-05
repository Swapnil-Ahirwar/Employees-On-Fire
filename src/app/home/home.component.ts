import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';
import { Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource = new MatTableDataSource<Employee>([]);
  displayedColumns: string[] = ['name', 'email', 'actions'];
  
  constructor(public dialog: MatDialog, public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.fetchData().subscribe(() => this.triggerTableChange())
  }

  addEmployee(): void {
    const opendialog = this.dialog.open(EmpDetailDialogComponent, { width: "400px" });
  }

  editEmployee(currentEmp: Employee) {
    const opendialog = this.dialog.open(EmpDetailDialogComponent, { 
      width: "400px", data: { dataKey: currentEmp }
    });
  }

  triggerTableChange() {
    this.dataSource.data = this.employeeService.dataToPopulate
    this.employeeService.isLoading = false
  }
}
