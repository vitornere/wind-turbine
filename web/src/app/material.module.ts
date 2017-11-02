import { NgModule } from '@angular/core';
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSelectModule,
  MatSidenavModule,
  MatStepperModule,
  MatPaginatorModule,
  MatButtonModule
} from '@angular/material';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { CdkTableModule } from '@angular/cdk/table';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSidenavModule,
    MatStepperModule,
    ObserversModule,
    PlatformModule,
    CdkTableModule,
  ]
})
export class CustomMaterialModule { }
