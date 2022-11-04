import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
  styleUrls: ['./emp-detail-dialog.component.css'],
})
export class EmpDetailDialogComponent implements OnInit {
  currEmployeeId: string = '';
  nameInput: string = '';
  emailInput: string = '';
  addMode: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<EmpDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.addMode = !(this.data != null && this.data.hasOwnProperty('dataKey'));
    if (!this.addMode) {
      let currentEmployee: Employee = this.data.dataKey;
      this.currEmployeeId = currentEmployee.id;
      this.nameInput = currentEmployee.name;
      this.emailInput = currentEmployee.email;
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onOkClick() {
    if (this.addMode)
      this.employeeService.addEmployee(this.nameInput, this.emailInput);
    else
      this.employeeService.updateEmployee(
        this.currEmployeeId, this.nameInput, this.emailInput
      );
  }
}
