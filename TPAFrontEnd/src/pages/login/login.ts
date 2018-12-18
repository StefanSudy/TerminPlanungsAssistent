import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/userprovider/userprovider'
import { APIService } from '../../providers/apiservice/apiservice';
import { User } from '../../models/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  user: User;
  constructor(public navCtrl: NavController, private userProvider: UserProvider, private restProvider: APIService) {

  }

  goToHome(email:string, password:string) {
    
     this.restProvider.PostValidateUser(email, password, true).subscribe(
      (response) => {
        this.userProvider.setUser(response)
      });
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
  }

  
  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
