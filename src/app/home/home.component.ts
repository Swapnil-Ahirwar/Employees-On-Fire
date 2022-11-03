import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  // defining our columns inside displayed columns variable
  displayedColumns: string[] = ['name', 'email', 'actions'];

  //initializing the datasource 
  dataSource = ELEMENT_DATA;

  addEmployee(): void {
    const opendialog = this.dialog.open(EmpDetailDialogComponent, {
      width: "400px"
    });
  }

}

export interface Employee{
  name: string;
  email: string;
  actions: string;
}

const ELEMENT_DATA: Employee[] = [
  {name:'swapnil', email: 'swapnil@gmail.com', actions:''},
  {name:'priya', email: 'priya@gmail.com', actions:''},
  {name:'rahul', email: 'rahul@gmail.com', actions:''},
  {name:'ritik', email: 'ritik@gmail.com', actions:''},
  {name:'shashi', email: 'shashi@gmail.com', actions:''},
  {name:'vivek', email: 'vivek@gmail.com', actions:''},
  {name:'amool', email: 'amool@gmail.com', actions:''},
  {name:'tape', email: 'tape@gmail.com', actions:''},
]
