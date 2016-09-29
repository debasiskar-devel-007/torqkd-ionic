import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,AlertController} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";

/*
  Generated class for the NotificationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/notification/notification.html',
})
export class NotificationPage {
  private loggedinuser;
  private local:LocalStorage;
  private datalist3;

  constructor(private navCtrl: NavController,private _http: Http,private sanitizer:DomSanitizationService) {
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      if(value!=null) {
        this.loggedinuser=JSON.parse(value).id;
        this.getData();
      }
      else{
        this.loggedinuser = 0;
      }
    });
  }

  getData(){

    var link = 'http://torqkd.com/user/ajs2/getNotificationList/id/'+this.loggedinuser;
    var data = {};

    this._http.post(link, data)
        .subscribe(res => {

          this.datalist3 = res.json();

        }, error => {
          console.log("Oooops!");
        });

  }

  getsanitizerstyle(imgsrc){
    return this.sanitizer.bypassSecurityTrustStyle('url(' + imgsrc + ')');
  }
  getsanitizedcontent(content){
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  getsanibackcol(item){
    if(item.is_read1 == 0){
      return this.sanitizer.bypassSecurityTrustStyle('#d9d9d9');
    }else{
      return this.sanitizer.bypassSecurityTrustStyle('#ebebeb');
    }
  }


}
