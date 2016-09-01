import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from  '../login/login';
import { Storage, LocalStorage } from 'ionic-angular';
import {ProfilePage} from '../profile/profile'
import {Splashscreen} from 'ionic-native';
import * as $ from "jquery";
//import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private local:LocalStorage;
  loginPage=LoginPage;
  profilePage=ProfilePage;
  private isloggedin:boolean=false;
  //private router:Router;

  constructor(private navCtrl: NavController) {
    //this.local=null;

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      //alert(value)
      if(value!=null) {

        //this.navpage();
        this.isloggedin=true;

        //return;
        // /$('.exp').click();
        //alert(value);
        //this.router.navigate(['<aliasInRouteConfig>']);
      }
      else{
        $('.has-header').removeClass('hide');
      }
    });

  
  }
  ionViewDidEnter() {


    console.log('ionViewDidEnter');

    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
    console.log(this.isloggedin);
    if(this.isloggedin)this.navCtrl.setRoot(ProfilePage);

  }

  public navpage(){
    console.log('nav methi called');
    this.navCtrl.setRoot(ProfilePage);

  }
}

