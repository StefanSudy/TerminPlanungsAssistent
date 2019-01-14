import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { APIService } from '../../providers/apiservice/apiservice';
import { User } from '../../models/user';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private restService: APIService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm(eMail: string, pwdNew: string) {
    var user = new User( {
      eMail: eMail,
      password: pwdNew,
      active: true
    });
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Wird gespeichert...'
    })
    loader.present();
    this.restService.PutUser(user).subscribe(
      () =>
      {
        let alert = this.alertCtrl.create({
          title: 'Erfolg',
          message: 'Die ausgefüllten Userdaten wurden geändert.',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }, error => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Fehler',
          message: 'Überprüfen Sie Ihre Eingaben.',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }
    );
    loader.dismiss();
  }
  validateNewPassword(pwdNew: string, event?): boolean {
    if(pwdNew){
      var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;   
      if (!regex.test(pwdNew)) {
        console.log("Passwort ungültig: Mindestens 1 Buchstabe, eine Zahl und acht Zeichen lang.");
        if (event) {
          event.target.style.borderRight = "6px solid red";
        }
        return false;
      }
      if(event) {
        event.target.style.borderRight = "0px";
      }
      return true;
    }
    return false;
  }
  validatePasswordRepeat(pwdRepeat: string, pwdNew: string, event?): boolean {
    if(pwdRepeat && pwdNew) {
      if(pwdRepeat != pwdNew) {
        console.log("Passwort ist nicht gleich.");
        if (event) {
          event.target.style.borderRight = "6px solid red";
        }
        return false;
      }
      if(event) {
        event.target.style.borderRight = "0px";
      }
      return true;
    }
    return false;
  }
  validateMail(eMail: string, event?): boolean {
    if(eMail){
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;   
      if (!regex.test(eMail)) {
        console.log("E-Mail Adresse ungültig.");
        if (event) {
          event.target.style.borderRight = "6px solid red";
        }
        return false;
      }
      if(event) {
        event.target.style.borderRight = "0px";
      }
      return true;
    }
    return false;
  }
}
