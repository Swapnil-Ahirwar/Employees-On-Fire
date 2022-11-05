import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { Employee } from '../models/employee';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {serverTimestamp } from 'firebase/firestore';
import { first, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  dataToPopulate: Employee[] = [];
  collection = this.firestore.collection<Employee>('test', ref => ref.orderBy('created'));
  
  isLoading : boolean = false;

  constructor(private firestore: AngularFirestore) {}

  fetchData() {
    this.isLoading = true
    return new Observable((observer) => {
      this.collection.snapshotChanges().subscribe((res) => {
        this.dataToPopulate = [];
        res.forEach((it) => {
          it.payload.doc.data()
          let document = it.payload.doc;
          this.dataToPopulate.push(document.data());
        });
        observer.next()
      });
    });
  }

  addEmployee(name: string, email: string) {
    this.isLoading = true

    let newId = this.firestore.createId()
    let newEmployee = new Employee(newId, name, email);
    this.collection.doc(newId).set(Object.assign({}, newEmployee, {created: serverTimestamp()}))
  }

  updateEmployee(idToUpdate: string, newName: string, newEmail: string) {
    this.isLoading = true
    
  }

  deleteEmployee(idToRemove: string) {
    this.isLoading = true
    return this.collection.doc(idToRemove).delete()
  }
}
