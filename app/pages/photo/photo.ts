import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {PhotodetPage} from "../photodet/photodet";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

/*
  Generated class for the PhotoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/photo/photo.html',
})
export class PhotoPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;
  private loggedinuser;
  private local:LocalStorage;
  private photolist;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {



    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;
      console.log(JSON.parse(value).id);
      if(value!=null) {
        this.getAllImages(this.loggedinuser);
      }
      else{
        $('ion-content').removeClass('hide');
        this.getAllImages(0);
      }
    });

  }
  openmenu(){
    $('.navmenul').click();
  }
  getAllImages(loggedinuser){
    var link = 'http://torqkd.com/user/ajs2/getAllImage';
    var data = {sessUser : loggedinuser};



    this._http.post(link, data)
        .subscribe(res => {
          this.photolist = res.json();
        }, error => {
          console.log("Oooops!");
        });

  }

  getsanitizerstyle(imgsrc){
    return this.sanitizer.bypassSecurityTrustStyle('url(http://torqkd.com/user/ajs1/createimage?image=' + imgsrc + ')');
  }

  showPhotoDetails(item){
    let modal = this.modalCtrl.create(PhotodetPage, {
      "item": item,
    });

    modal.present();

  }
  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
  }


}
