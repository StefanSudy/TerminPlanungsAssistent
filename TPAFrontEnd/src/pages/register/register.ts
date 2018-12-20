import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms'
import { EmailValidator } from '../../app/emailValidate';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email:AbstractControl;
  password:AbstractControl;
  passwordRepeat:AbstractControl;
  signupForm:FormGroup;

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid, Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      passwordRepeat: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.email=this.signupForm.controls['email'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    //if(this.email.length==0 || this.password.length==0 || this.passwordRepeat.length==0)
      //alert("Bitte alle Felder ausfüllen!")
    if(this.signupForm.valid){
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    }
    else{
      
    }
  }

}
