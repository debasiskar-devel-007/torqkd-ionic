import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {Splashscreen, InAppBrowser} from "ionic-native";

/*
  Generated class for the ExperiencePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/experience/experience.html',
})
export class ExperiencePage {

  mySlideOptions = {
    initialSlide: 0,
    loop: true,
    autoplay:4000
  };

  mySlideOptions2 = {
    initialSlide: 0,
    loop: true,
    autoplay:4000
  };

  mySlideOptions3 = {
    initialSlide: 0,
    loop: true,
    autoplay:4000
  };

  public sportslist;
  public banner1data;
  public banner2data;


  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {



/***************sport slider [start]********************/
    var link1 = 'http://torqkd.com/user/ajs2/GetParentSports';
    var data1 = {};

    this._http.post(link1, data1)
        .subscribe(res1 => {

          this.sportslist = res1.json();

        }, error => {
          console.log("Oooops!");
        });
    /***************sport slider [end]********************/


    /***************banner slider [start]********************/
    var link2 = 'http://torqkd.com/user/ajs2/getProfilebanners';
    var data2 = {pageid: 1,sp_id:0};



    this._http.post(link2, data2)
        .subscribe(res2 => {
          this.banner1data=res2.json().banner1;
          this.banner2data=res2.json().banner2;
        }, error => {
          console.log("Oooops!");
        });
    /***************banner slider [end]********************/



  }

    launch(url){

        InAppBrowser.open(url,  '_system', 'location=yes');
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

  getsanitizerstyle(imgsrc){
    return this.sanitizer.bypassSecurityTrustStyle('url(http://torqkd.com/uploads/sports_image/additional/thumb/' + imgsrc + ')');
  }

}
