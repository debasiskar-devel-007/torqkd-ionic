import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,AlertController} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {SinglepostPage} from "../singlepost/singlepost";
import * as $ from "jquery";
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';


/*
  Generated class for the NotificationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/notification/notification.html',
})
export class NotificationPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;
  private loggedinuser;
  private local:LocalStorage;
  private datalist3;

  constructor(private navCtrl: NavController,private nav: Nav,private _http: Http,private sanitizer:DomSanitizationService) {
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

  openmenu(){
    $('.navmenul').click();
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
      return this.sanitizer.bypassSecurityTrustStyle('#d9d9d9 none repeat scroll 0 0');
    }else{
      return this.sanitizer.bypassSecurityTrustStyle('#ebebeb none repeat scroll 0 0');
    }
  }

  markasreadnot(item){
    if(item.is_read1 == 0){
      var link = 'http://torqkd.com/user/ajs2/markasreadnot1';
      var data = {cid : this.loggedinuser, id: item.id};

      this._http.post(link, data)
          .subscribe(res => {

            item.is_read1 = res;

            this.nav.push(SinglepostPage,{postId: item.post_id });

          }, error => {
            console.log("Oooops!");
          });
    }else{
      this.nav.push(SinglepostPage,{postId: item.post_id });
    }
  }


}
