import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  emailValidation = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameValidation = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(60),
  ]);

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

  @HostListener('window:keyup.Enter', ['$event'])
  onDialogClick(event: KeyboardEvent): void {
    this.onOkClick();
    this.close();
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onOkClick() {
    this.nameValidation.markAsTouched();
    this.emailValidation.markAllAsTouched();

    if (this.nameValidation.valid && this.emailValidation.valid) {
      if (this.addMode)
        this.employeeService.addEmployee(this.nameInput, this.emailInput);
      else this.employeeService.updateEmployee(
        this.currEmployeeId,
        this.nameInput,
        this.emailInput
      );
      this.close()
    }
  }

  getErrorMessage() {
    return this.emailValidation.hasError('required')
      ? 'You must enter a value'
      : this.emailValidation.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getNameErrorMessage() {
    return this.nameValidation.hasError('required')
      ? 'You must enter a name'
      : this.nameValidation.hasError('minlength')
      ? 'Min length is 3'
      : this.nameValidation.hasError('maxlength')
      ? 'Max length is 60'
      : '';
  }
}
