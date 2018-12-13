import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  email:string;
  password:string;

  constructor(public navCtrl: NavController) {

  }

  goHome(){
    //Überprüfung des Users

    if(true){ //User ist gültig
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
    }else{
      alert("User ist nicht vorhanden.")
    }
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
