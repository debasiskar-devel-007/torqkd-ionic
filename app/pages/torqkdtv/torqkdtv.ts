import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {VideodetPage} from "../videodet/videodet";

/*
  Generated class for the TorqkdtvPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/torqkdtv/torqkdtv.html',
})
export class TorqkdtvPage {
  private loggedinuser;
  private local:LocalStorage;
  private videolist;

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
    var link = 'http://torqkd.com/user/ajs2/getAllVideo';
    var data = {sess_id : loggedinuser};



    this._http.post(link, data)
        .subscribe(res => {
          this.videolist = res.json();
        }, error => {
          console.log("Oooops!");
        });

  }

  getsanitizerstyle(imgsrc){
    return this.sanitizer.bypassSecurityTrustStyle('url(' + imgsrc + ')');
  }

  showPhotoDetails(item){
    let modal = this.modalCtrl.create(VideodetPage, {
      "item": item,
    });

    modal.present();

  }


}
