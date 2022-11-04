import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmpDetailDialogComponent } from './emp-detail-dialog/emp-detail-dialog.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmpDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule,
    CommonModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    {
    provide: MatDialogRef,
    useValue: {}
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
