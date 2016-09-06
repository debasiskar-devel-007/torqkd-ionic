import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfilePage} from '../profile/profile'
import {Control} from "@angular/common";
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage } from 'ionic-angular';
//import * as $ from "jquery";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class LoginPage {
  public _loginUrl:string = "http://torkq.com/login";
  private loginForm:FormGroup;
  public verifyemail=true;
  public verifylogin=true;
  private data;
  private data1;
  private nav:NavController;
  private local:LocalStorage;
  profilePage=ProfilePage;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }



  doLogin(event) {
    //console.log(this.loginForm.value);
    console.log(99);
    console.log(event);
    console.log(event.email);
    if(!validateEmail(event.email) && event.email !=''){
      this.verifyemail=false;
      return;
    }
    if(this.loginForm.valid){
      //var body = 'email='+event.email+'&password='+event.password;
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      var link = 'http://torqkd.com/user/ajs2/login';
      //var data = $.param({email: event.email,password:event.password});
      //var data = JSON.stringify({email: event.email,password:event.password});
      var data = {email: event.email,password:event.password};

      this._http.post(link, data)
          .subscribe(data => {
            // /this.data1.response = data.json();
            console.log(data);
            if(data.json()==null){
              this.verifylogin=false;

              return;
            }
            else{

              this.verifylogin=true;
              this.local = new Storage(LocalStorage);
              this.local.set('userinfo', JSON.stringify(data.json()));
              this.local.get('userinfo').then((value) => {
                //alert(value)
                var dt = JSON.parse(value);
                console.log("Local Storage value:", dt.id);
                console.log("Local Storage value id:", value);
                console.log("Local Storage value fname:", JSON.stringify(dt));
              })
              this.navCtrl.push(ProfilePage);

            }
          }, error => {
            console.log("Oooops!");
          });


      //this.navCtrl.push(ProfilePage);
    }
  }

}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log('vali email called');
  return re.test(email);
}

