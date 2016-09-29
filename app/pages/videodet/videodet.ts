import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {PhotocommentPage} from "../photocomment/photocomment";
import {VideocommentPage} from "../videocomment/videocomment";

/*
  Generated class for the VideodetPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/videodet/videodet.html',
})
export class VideodetPage {
  private itemdet;
  private loggedinuser;
  private local:LocalStorage;
    private poster;
    private videourl;

  constructor(private navCtrl: NavController,private _navParams: NavParams,private _http: Http,public modalCtrl: ModalController) {
    this.itemdet=this._navParams.get("item");
    console.log(this.itemdet);
      if(this.itemdet.type == 'mp4'){
          this.videourl="http://torqkd.com/uploads/video/converted/"+this.itemdet.value;
          this.poster=this.itemdet.img_src;
      }

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      if(value!=null) {
        this.loggedinuser=JSON.parse(value).id;
      }else{
        this.loggedinuser = 0;
      }
    });
  }

  goback(){
    this.navCtrl.pop();
  }

  updatelike(itemid,ttype){
    if(this.loggedinuser > 0){

        if(ttype == 'video'){
            var link1 = 'http://torqkd.com/user/ajs2/likevideo/id/'+itemid+'/userid/'+this.loggedinuser;
        }else{
            var link1 = 'http://torqkd.com/user/ajs2/likestatus/id/'+itemid+'/userid/'+this.loggedinuser;
        }

      var data1 = {userid :this.loggedinuser};

      this._http.post(link1,data1)
          .subscribe(data => {
            if(data.json()==null){
              return;
            }
            else{
              this.itemdet.likeStatus = data.json().is_like;
              this.itemdet.likeNo = data.json().like_no;
            }
          }, error => {
            console.log("Oooops!");
          });
    }
  }

  showComment(item){
      if(item.ttype == 'video'){
          var link1 = 'http://torqkd.com/user/ajs2/getVideoComment';
          var data1 = {id : item.id};

          this._http.post(link1,data1)
              .subscribe(data => {
                  if(data.json()==null){
                      return;
                  }
                  else{
                      item.commentList = data.json();
                  }

                  let modal = this.modalCtrl.create(VideocommentPage, {
                      "item": item,
                  });

                  modal.present();

              }, error => {
                  console.log("Oooops!");
              });
      }else{
          var link1 = 'http://torqkd.com/user/ajs2/getStatusComment';
          var data1 = {id : item.id};

          this._http.post(link1,data1)
              .subscribe(data => {
                  if(data.json()==null){
                      return;
                  }
                  else{
                      item.commentList = data.json();
                  }

                  let modal = this.modalCtrl.create(PhotocommentPage, {
                      "item": item,
                  });

                  modal.present();

              }, error => {
                  console.log("Oooops!");
              });
      }
  }
}
