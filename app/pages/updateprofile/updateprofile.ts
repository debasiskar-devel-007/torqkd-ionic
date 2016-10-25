import { Component } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {HomePage} from '../home/home';
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {ProfilePage} from "../profile/profile";
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {ControlGroup, Control} from "@angular/common";

/*
  Generated class for the UpdateprofilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/updateprofile/updateprofile.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class UpdateprofilePage {
  public homepage = HomePage;
  public profilepage = ProfilePage;
  public sportlist;
  private signUpForm:FormGroup;

  constructor(private navCtrl: NavController,public modalCtrl: ModalController,private _http: Http,public fb: FormBuilder) {


    this.signUpForm = fb.group({
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      email: ["", Validators.required],
      email2: [""],
      password: ["", Validators.required],
      password2: [""],
      city: ["", Validators.required],
      country: ["", Validators.required],
      state: ["", Validators.required],
      gender: ["0"],
    }, {validator: this.matchingPasswords('password', 'password2')});



    /****************Sport List********************/
    var link3 = 'http://torqkd.com/user/ajs2/allsports';
    var data3 = {};



    this._http.post(link3, data3)
        .subscribe(res3 => {
          this.sportlist = res3.json();
        }, error => {
          console.log("Oooops!");
        });
    /****************Sport List********************/

  }

  openmenu(){
    $('.navmenul').click();
  }

  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
  }

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: ControlGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

}
