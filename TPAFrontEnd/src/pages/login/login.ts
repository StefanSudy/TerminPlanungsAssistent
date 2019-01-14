import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, Loading, LoadingController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { APIService } from '../../providers/apiservice/apiservice';
import { User } from '../../models/user';
import { AppointmentProvider } from '../../providers/appointmentprovider/appointmentprovider';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  user: User;
  constructor(public navCtrl: NavController, private restProvider: APIService, private alertCtrl: AlertController, public menu: MenuController, private appointmentProvider: AppointmentProvider, private loadingCtrl: LoadingController) {
    this.menu.enable(false);
  }

  ionViewWillLoad() {
    if(localStorage.getItem('access_token')) {
      let loading = this.loadingCtrl.create({
        content: "Daten werden geladen",
        spinner: 'crescent'
      });
      loading.present();
      this.restProvider.GetAppointmentsForUser()
      .subscribe(response => {
        this.appointmentProvider.setAppointments(response);
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Fehler beim Verbinden zur Cloud',
          message: 'Klicken Sie ok um offline einzusteigen. (Änderungen werden nicht gespeichert!)',
          buttons: [
            {
              text: 'Abbrechen',
              role: 'cancel',
            },
            {
            text: 'Ok',
            handler: () => {
                loading.dismiss();
                this.navCtrl.setRoot(HomePage);
                this.navCtrl.popToRoot();
              }
            }
          ]
        });
        alert.present();
        console.log(error);
      });
    }
  }

  goToHome(email: string, password: string) {
    if(this.validateMail(email) && password) {
      let loading = this.loadingCtrl.create({
        content: "Daten werden geladen",
        spinner: 'crescent'
      });
      loading.present();
      this.restProvider.PostValidateUser(email, password, true).subscribe(
        response => {
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('user_id', response.id.toString());
          this.restProvider.GetAppointmentsForUser().subscribe(
            response => {
              this.appointmentProvider.setAppointments(response);
              loading.dismiss();
              this.navCtrl.setRoot(HomePage);
              this.navCtrl.popToRoot();
            }, error => {
              console.log(error);
            }
          )
        }, error => {
          console.log(error);
          let alert = this.alertCtrl.create({
            title: 'E-Mail oder Passwort falsch',
            message: 'Bitte überprüfen Sie Ihre Eingaben.',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  loading.dismiss();
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
          console.log("Eingaben sind ungültig.");
        }
      )
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Eingaben ungültig!',
        message: 'Bitte überprüfen Sie Ihre Eingaben.',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
      console.log("Eingaben sind ungültig.");
    }
  }

  validateMail(email:string, event?): boolean {
    if(email){
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;   
      if (!regex.test(email)) {
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

  goToRegister(email: string, password: string) {
    this.navCtrl.push(RegisterPage, {
      'email': email,
      'password': password
    });
  }

}
