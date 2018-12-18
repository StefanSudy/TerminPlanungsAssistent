import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { APIService } from '../../providers/apiservice/apiservice';
import { User } from '../../models/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  user: User;
  constructor(public navCtrl: NavController, private restProvider: APIService) {

  }

  goToHome(email:string, password:string) {
     this.restProvider.PostValidateUser(email, password, true).subscribe(
      (response) => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('user_id', response.id.toString());
      });

      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
  }

  
  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
