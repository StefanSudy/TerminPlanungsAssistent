import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { APIService } from '../../providers/apiservice/apiservice';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email: string;
  password: string;  

  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: APIService) {
    this.email = this.navParams.get('email');
    this.password = this.navParams.get('password');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  validateMail(email: string, event?): boolean {
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
  validatePassword(pwd: string, event?): boolean {
    if(pwd){
      var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;   
      if (!regex.test(pwd)) {
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
  validatePasswordRepeat(pwdRepeat: string, pwd: string, event?): boolean {
    if(pwdRepeat && pwd) {
      if(pwdRepeat != pwd) {
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

  register(email: string, pwd: string, passwordRepeat: string){
    if (this.validateMail(email) 
    && this.validatePassword(pwd) 
    && this.validatePasswordRepeat(passwordRepeat, pwd)) {
      var user = new User({
        eMail: email,
        password: pwd,
        active: true
      });
      this.restProvider.PostUser(user).subscribe(
        response => {
          this.restProvider.PostValidateUser(email, pwd, true).subscribe(
            response => {
              localStorage.setItem('user_id', response.id.toString());
              localStorage.setItem('access_token', response.token);
              localStorage.setItem('appointments', '[]');
              this.navCtrl.setRoot(HomePage);
              this.navCtrl.popToRoot();
            });
        });
    }
  }
}
