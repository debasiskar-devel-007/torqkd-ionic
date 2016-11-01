import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage, LocalStorage,ModalController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {SignupactivityPage} from "../signupactivity/signupactivity";
import {SignupconnectPage} from "../signupconnect/signupconnect";
import {SignupnextPage} from "../signupnext/signupnext";
import {SignupaddimagePage} from "../signupaddimage/signupaddimage";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import {ControlGroup, Control} from "@angular/common";
/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/signup/signup.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignupPage {
  private signUpForm:FormGroup;
  public homepage = HomePage;
  public verifyemail=true;
  public emailmatch=true;
  public countrylist = [];
  public statelist = [];
  public stateLoad = false;
  private local:LocalStorage;

  constructor(private navCtrl: NavController,public modalCtrl: ModalController,public fb: FormBuilder,private _http: Http) {

    this.local = new Storage(LocalStorage);

    this.local.get('newUserId').then((value) => {
      if(value!=null) {
      //  this.navCtrl.push(SignupaddimagePage);
      }
    });

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

    /****************country list********************/
    var link3 = 'http://torqkd.com/user/ajs2/getCountryList';
    var data3 = {};



    this._http.post(link3, data3)
        .subscribe(res3 => {
          this.countrylist = res3.json();
        }, error => {
          console.log("Oooops!");
        });
    /****************country List********************/




  }

  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
  }

  formsubmit(event){

    let x: any;

    for (x in this.signUpForm.controls) {
      this.signUpForm.controls[x].markAsTouched();
    }

    if(!validateEmail(event.email)){
      this.verifyemail=false;
      return;
    }

    if (this.signUpForm.valid) {

      var link = 'http://torqkd.com/user/ajs2/signup';
      var data = {city : event.city,country : event.country,email : event.email,email2 : event.email,fname : event.fname,gender : event.gender,lname : event.lname,password : event.password,password2 : event.password2,state : event.state};

      this._http.post(link, data)
          .subscribe(res => {

            var sdfs:string = res.text();
            if(sdfs == 'error'){
              alert('Error ocurred');
            }else{
              this.local = new Storage(LocalStorage);
              this.local.set('newUserId', sdfs);
              this.navCtrl.push(SignupactivityPage);
            }

          }, error => {
            console.log("Oooops!");
          });


    }

  }

  changecountry(countryval){
    this.statelist = [];

    if(countryval != ''){
      this.stateLoad = true;
      var link3 = 'http://torqkd.com/user/ajs2/getStateList';
      var data3 = {id:countryval};



      this._http.post(link3, data3)
          .subscribe(res3 => {
            this.statelist = res3.json();
            this.stateLoad = false;
          }, error => {
            console.log("Oooops!");
            this.stateLoad = false;
          });
    }

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

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log('vali email called');
  return re.test(email);
}
