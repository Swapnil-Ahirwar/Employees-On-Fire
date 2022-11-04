import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  dataToPopulate: Employee[] = [];
  collection = this.firestore.collection('test');

  constructor(private firestore: AngularFirestore) {}

  fetchData() {
    return new Promise<void>((resolve, reject) => {
      this.collection.snapshotChanges().subscribe((res) => {
        this.dataToPopulate = [];
        res.forEach((it) => {
          let document = it.payload.doc;
          let curr: any = document.data();
          this.dataToPopulate.push(new Employee(curr.name, curr.email, curr.id));
          resolve();
        });
      });
    });
  }

  addEmployee(name: string, email: string) {
    let newEmployee = new Employee(name, email);

    this.collection.add(Object.assign({}, newEmployee)).then((doc) => {
      this.collection
        .doc(doc.id)
        .get()
        .pipe(first())
        .subscribe((curr) => {
          let data: any = curr.data();
          this.collection
            .doc(doc.id)
            .set(Object.assign({}, new Employee(data.name, data.email, doc.id)))
        });
    });
  }

  updateEmployee(idToUpdate: string, newName: string, newEmail: string) {
    const index = this.dataToPopulate.findIndex(
      (curr) => curr.id === idToUpdate
    );
    this.dataToPopulate[index].name = newName;
    this.dataToPopulate[index].email = newEmail;
  }

  deleteEmployee(idToRemove: string) {
    console.log("id", idToRemove)
    if(idToRemove !== null || idToRemove !== undefined) { 
      this.collection.doc(idToRemove).delete();
    }
  }
}
