import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/*
  Generated class for the SocialcommentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/socialcomment/socialcomment.html',
})
export class SocialcommentPage {
  public  items;

  constructor(private navCtrl: NavController,private _navParams: NavParams) {
    this.items=this._navParams.get("item");
    console.log(this.items);

  }


  goback(){
    console.log('dfdsf');
    this.navCtrl.pop();
  }

}
