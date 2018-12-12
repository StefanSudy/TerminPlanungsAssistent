import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditItemPage } from '../edit-item/edit-item';
import { APIService } from '../../providers/apiservice/apiservice';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-view-item',
  templateUrl: 'view-item.html',
})
export class ViewItemPage {
  currentItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: APIService, private alertCtrl: AlertController) {
    this.currentItem = this.navParams.get('currentItem')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewItemPage');
  }

  clickedEdit($event, currentItem) {
    this.navCtrl.push(EditItemPage, { 
      currentItem: currentItem
    });
  }
  clickedDelete($event, currentItem) {
    let alert = this.alertCtrl.create({
      title: 'Sind sie sicher?',
      message: 'Der Termin wird unwiderruflich gelöscht.',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Löschen',
          handler: () => {
            this.restProvider.DeleteAppointment(currentItem.id)
            .subscribe(
              () => {
                this.currentItem;
              });
            this.navCtrl.pop();
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  
}
