import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChecklistPage } from '../pages/checklist/checklist';
import { SettingsPage } from '../pages/settings/settings';
import { CalendarPage } from '../pages/calendar/calendar';
import { ViewItemPage } from '../pages/view-item/view-item';
import { EditItemPage } from '../pages/edit-item/edit-item';
import { NewItemPage } from '../pages/new-item/new-item';
import { Login } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { APIService } from '../providers/apiservice/apiservice';
import { HttpClientModule } from '@angular/common/http';
import { UserProvider } from '../providers/userprovider/userprovider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChecklistPage,
    SettingsPage,
    CalendarPage,
    ViewItemPage,
    EditItemPage,
    NewItemPage,
    Login,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChecklistPage,
    SettingsPage,
    CalendarPage,
    ViewItemPage,
    EditItemPage,
    NewItemPage,
    Login,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    APIService,
    UserProvider
  
  ]
})
export class AppModule {}