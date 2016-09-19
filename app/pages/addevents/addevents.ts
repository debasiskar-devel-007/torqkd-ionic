import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, Nav} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";

/*
  Generated class for the AddeventsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/addevents/addevents.html',
})
export class AddeventsPage {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Content)
  content:Content;

  constructor(public platform: Platform,public navCtrl: NavController) {

    platform.registerBackButtonAction(() => {
      //alert('in app.ts');

      this.goback();

    });

  }
  goback(){
    console.log(this.navCtrl);
    this.navCtrl.pop();
  }

}
