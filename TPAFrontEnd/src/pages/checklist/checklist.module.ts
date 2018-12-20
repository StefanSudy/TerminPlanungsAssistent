import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpandableComponent } from '../../components/expandable/expandable';
import { ChecklistPage } from './checklist';

@NgModule({
  declarations: [
    ChecklistPage,
  ],
  imports: [
    ExpandableComponent,
    IonicPageModule.forChild(ChecklistPage),
  ],
  exports: [
    ChecklistPage
  ]
})
export class MyPageModule {}