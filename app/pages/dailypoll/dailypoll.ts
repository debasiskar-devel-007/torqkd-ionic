import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import * as $ from "jquery";

/*
  Generated class for the DailypolPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/dailypoll/dailypoll.html',
})
export class DailypollPage {
  private loggedinuser;
  private local:LocalStorage;
  private itemlist;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {


      if(value!=null) {
        this.loggedinuser=JSON.parse(value).id;
        this.getPolls();
      }
      else{
        this.loggedinuser = 0;
        $('ion-content').removeClass('hide');
      }
    });
  }

  getPolls(){
    var link = 'http://torqkd.com/user/ajs2/getpolldetnew';
    var data = { user_id : this.loggedinuser};

    this._http.post(link, data)
        .subscribe(res => {
          this.itemlist = res.json();
        }, error => {
          console.log("Oooops!");
        });
  }

}
