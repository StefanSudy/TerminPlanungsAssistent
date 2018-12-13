import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { APIService } from "../../providers/apiservice/apiservice";
import { User } from '../../models/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  email: string;
  password: string;
  user: User;

  constructor(public navCtrl: NavController, private restService: APIService) {
    
  }

  login(){
    //Überprüfung des Users
    this.restService.PostValidateUser(this.email, this.password)
    .subscribe(
      (gotUser) => {
        this.user = gotUser;
      }
    );
    if(true){ //User ist gültig
      
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot({
    });
    }else{
      alert("User ist nicht vorhanden.")
    }
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
