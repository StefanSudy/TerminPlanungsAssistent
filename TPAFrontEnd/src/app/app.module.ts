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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { APIService } from '../providers/apiservice/apiservice';
import { HttpClientModule } from '@angular/common/http';

//Um die Sprache für den Kalender zu ändern
import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDEAT from '@angular/common/locales/de-AT';
import { AppointmentProvider } from '../providers/appointmentprovider/appointmentprovider';
import { CalendarPageModule } from '../pages/calendar/calendar.module';
import { ComponentsModule } from '../components/components.module';
import { ChecklistPageModule } from '../pages/checklist/checklist.module';
import { EditItemPageModule } from '../pages/edit-item/edit-item.module';
import { ViewItemPageModule } from '../pages/view-item/view-item.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { NewItemPageModule } from '../pages/new-item/new-item.module';
import { HomePageModule } from '../pages/home/home.module';

registerLocaleData(localeDEAT);
//Sprache Kalender Ende

@NgModule({
  declarations: [
    MyApp,
    //HomePage,
    //ChecklistPage,
    //SettingsPage,
    //CalendarPage,
    //ViewItemPage,
    //EditItemPage,
    //NewItemPage,
    LoginPage,
    //RegisterPage,
    //ExpandableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    CalendarPageModule,
    ChecklistPageModule,
    ComponentsModule,
    EditItemPageModule,
    ViewItemPageModule,
    SettingsPageModule,
    RegisterPageModule,
    NewItemPageModule,
    HomePageModule,
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
    { provide: LOCALE_ID, useValue: 'de-AT' }, //Es wird das deutsch Sprachpaket geladen.
    AppointmentProvider,
  
  ]
})
export class AppModule {}