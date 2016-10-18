import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';

/*
  Generated class for the HomevideomodalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/homevideomodal/homevideomodal.html',
})
export class HomevideomodalPage {
  private poster;
  private videourl;

  constructor(private navCtrl: NavController,private _navParams: NavParams) {
    this.poster=this._navParams.get("poster");
    this.videourl=this._navParams.get("url");

  }



  ionViewDidEnter() {
    ScreenOrientation.lockOrientation('landscape');
  }
  onPageWillLeave() {
    ScreenOrientation.unlockOrientation();
  }
  goback(){
    this.navCtrl.pop();
  }

}
