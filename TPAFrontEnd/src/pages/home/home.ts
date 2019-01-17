import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ChecklistPage } from '../checklist/checklist';
import { CalendarPage } from '../calendar/calendar';
import { ViewItemPage } from '../view-item/view-item';
import { NewItemPage } from '../new-item/new-item';
import { AppointmentProvider } from '../../providers/appointmentprovider/appointmentprovider';
import { APIService } from '../../providers/apiservice/apiservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public currentItems: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private appointmentProvider: AppointmentProvider, public menu: MenuController, private restProvider: APIService) {
    this.menu.enable(true);
  }

  itemTapped(item) {
    this.navCtrl.push(ViewItemPage, { 
      currentItem: item
    })
  }

  goToChecklist() {
    this.navCtrl.push(ChecklistPage);
  }
  
  goToCalendar() {
    this.navCtrl.push(CalendarPage);
  }

  goToNewItem() {
    this.navCtrl.push(NewItemPage);
  }
  
  ionViewWillEnter() {
    this.currentItems = this.appointmentProvider.getAppointments()
  }
  doRefresh(refresher) {
    this.restProvider.GetAppointmentsForUser().subscribe(response => {
      this.currentItems = response;
      refresher.complete();
    }, error => {
      console.log(error);
      refresher.complete();
    })
  }
}
