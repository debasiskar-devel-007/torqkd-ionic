import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {VideodetPage} from "../videodet/videodet";
import {AlbumPage} from "../album/album";
import {ProfilePage} from "../profile/profile";
import * as $ from "jquery";

/*
  Generated class for the AlbumvideoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/albumvideo/albumvideo.html',
})
export class AlbumvideoPage {
  private loggedinuser;
  private local:LocalStorage;
  private videolist;
  public albumpage = AlbumPage;
  public profilepage = ProfilePage;
  private userImage;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {
    this.userImage = 'http://torqkd.com/uploads/user_image/thumb/default.jpg';
    
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;
      console.log(JSON.parse(value).id);
      if(value!=null) {
        this.getvideos(this.loggedinuser,this.loggedinuser);
        this.userImage = JSON.parse(value).user_image;
      }
      else{
        $('ion-content').removeClass('hide');
        this.getvideos(0,60);
      }
    });
  }

  openmenu(){
    $('.navmenul').click();
  }
  getvideos(loggedinuser,userid){
    var link = 'http://torqkd.com/user/ajs2/getVideo';
    var data = {userid:userid,sess_id : loggedinuser};



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
