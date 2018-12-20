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
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ExpandableComponent } from '../components/expandable/expandable';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { APIService } from '../providers/apiservice/apiservice';
import { HttpClientModule } from '@angular/common/http';
//Importieren des Kalendermodules
import { NgCalendarModule  } from 'ionic2-calendar';
//Um die Sprache für den Kalender zu ändern
import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDEAT from '@angular/common/locales/de-AT';

registerLocaleData(localeDEAT);
//Sprache Kalender Ende

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
    LoginPage,
    RegisterPage,
    ExpandableComponent,
  ],
  imports: [
    NgCalendarModule,
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
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    APIService,
    { provide: LOCALE_ID, useValue: 'de-AT' },//Es wird das deutsch Sprachpaket geladen.
  
  ]
})
export class AppModule {}