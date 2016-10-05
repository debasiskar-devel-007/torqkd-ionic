import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import * as $ from "jquery";

/*
  Generated class for the MysportsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/mysports/mysports.html',
})
export class MysportsPage {
  private loggedinuser;
  private local:LocalStorage;
  private userImage;
  private itemlist;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;

      this.getsports();

      if(value!=null) {
        this.userImage = JSON.parse(value).user_image;
      }
      else{
        $('ion-content').removeClass('hide');
      }
    });
  }

  openmenu(){
    $('.navmenul').click();
  }

  getsports(){
    var link = 'http://torqkd.com/user/ajs2/usersportsnew';
    var data = {userid : this.loggedinuser };



    this._http.post(link, data)
        .subscribe(res => {
          this.itemlist = res.json();

        }, error => {
          console.log("Oooops!");
        });
  }

}
