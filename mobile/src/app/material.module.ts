import {NgModule} from '@angular/core';

import {
  MatIconModule,
  MatInputModule
} from '@angular/material';

import {PlatformModule} from '@angular/cdk/platform';
import {ObserversModule} from '@angular/cdk/observers';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    MatIconModule,
    MatInputModule,
    ObserversModule,
    PlatformModule
  ]
})
export class CustomMaterialModule {}
