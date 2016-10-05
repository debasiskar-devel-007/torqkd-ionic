import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {PhotodetPage} from "../photodet/photodet";
import {AlbumvideoPage} from "../albumvideo/albumvideo";
import {ProfilePage} from "../profile/profile";
import * as $ from "jquery";

/*
  Generated class for the AlbumPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/album/album.html',
})
export class AlbumPage {
  private loggedinuser;
  private local:LocalStorage;
  private photolist;
  public albumvideopage = AlbumvideoPage;
  public profilepage = ProfilePage;
  public userImage;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;
      console.log(JSON.parse(value));
      if(value!=null) {
        this.getimages(this.loggedinuser,this.loggedinuser);
        this.userImage = JSON.parse(value).user_image;
      }
      else{
        $('ion-content').removeClass('hide');
        this.getimages(0,60);
      }
    });
  }

  openmenu(){
    $('.navmenul').click();
  }
  getimages(loggedinuser,userid){
    var link = 'http://torqkd.com/user/ajs2/getImage';
    var data = {userid:userid,sess_id : loggedinuser};



    this._http.post(link, data)
        .subscribe(res => {
          this.photolist = res.json();
        }, error => {
          console.log("Oooops!");
        });

  }

  getsanitizerstyle(imgsrc){
    return this.sanitizer.bypassSecurityTrustStyle('url(' + imgsrc + ')');
  }

  showPhotoDetails(item){
    let modal = this.modalCtrl.create(PhotodetPage, {
      "item": item,
    });

    modal.present();

  }


}
