import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphicPage } from './graphic.page';

@NgModule({
  declarations: [
    GraphicPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphicPage),
  ],
})
export class GraphicPageModule {}
