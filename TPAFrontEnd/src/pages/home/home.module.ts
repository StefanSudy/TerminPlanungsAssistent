import { NgModule } from '@angular/core';
//import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { HomePage } from './home';
import { APIService } from '../../providers/apiservice/apiservice';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  //  TranslateModule.forChild()
  ],
  providers: [
    APIService
  ],
})
export class HomePageModule { }