import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { ChecklistPage } from './checklist';

@NgModule({
  declarations: [
    ChecklistPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ChecklistPage),
  ],
  exports: [
    ChecklistPage
  ]
})
export class ChecklistPageModule {}