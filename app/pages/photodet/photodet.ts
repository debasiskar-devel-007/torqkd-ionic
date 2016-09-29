import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {PhotocommentPage} from "../photocomment/photocomment";

/*
  Generated class for the PhotodetPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/photodet/photodet.html',
})
export class PhotodetPage {
  private itemdet;
  private loggedinuser;
  private local:LocalStorage;

  constructor(private navCtrl: NavController,private _navParams: NavParams,private _http: Http,public modalCtrl: ModalController) {
    this.itemdet=this._navParams.get("item");
    console.log(this.itemdet);

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

  updatelike(itemid){
    if(this.loggedinuser > 0){
      var link1 = 'http://torqkd.com/user/ajs2/likestatus/id/'+itemid+'/userid/'+this.loggedinuser;
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
