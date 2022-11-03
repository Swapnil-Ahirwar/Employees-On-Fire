import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
  styleUrls: ['./emp-detail-dialog.component.css']
})
export class EmpDetailDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EmpDetailDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(null);
  }

}
