import { NgModule } from '@angular/core';
import {
  MdCheckboxModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdTableModule,
  MdSelectModule,
  MatSidenavModule,
  MatStepperModule,
  MatPaginatorModule,
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { CdkTableModule } from '@angular/cdk/table';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    MdTableModule,
    MdSelectModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdNativeDateModule,
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
