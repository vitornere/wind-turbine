import { NgModule } from '@angular/core';


import {
  MatSidenavModule,
  MdButtonModule,
  MdCheckboxModule,
  MatStepperModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdTableModule,
  MdSelectModule,
  MatPaginatorModule
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
    MatPaginatorModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdButtonModule,
    MdCheckboxModule,
    MatSidenavModule,
    MatStepperModule,
    ObserversModule,
    PlatformModule,
    CdkTableModule
  ]
})
export class CustomMaterialModule { }
