import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from "@ionic-native/keyboard";

import { HomePage } from '../pages/home/home';
import { ChecklistPage } from '../pages/checklist/checklist';
import { SettingsPage } from '../pages/settings/settings';
import { CalendarPage } from '../pages/calendar/calendar';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public keyboard: Keyboard) {
    this.initializeApp();

    this.pages = [
      { title: 'Hauptmenü', component: HomePage, icon: 'home'},
      { title: 'Checkliste', component: ChecklistPage, icon: 'checkbox-outline'},
      { title: 'Kalender', component: CalendarPage, icon: 'calendar'},
      { title: 'Userdaten ändern', component: SettingsPage, icon: 'person'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.keyboard.disableScroll(true);
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }
}
