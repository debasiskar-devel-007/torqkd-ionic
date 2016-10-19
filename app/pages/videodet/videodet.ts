import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {PhotocommentPage} from "../photocomment/photocomment";
import {VideocommentPage} from "../videocomment/videocomment";
import {Facebook} from 'ionic-native';
import {Fbcomment1Page} from "../fbcomment1/fbcomment1";
import {TwcommentPage} from "../twcomment/twcomment";
import { ActionSheetController,ToastController } from 'ionic-angular';
import { InAppBrowser} from "ionic-native";
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

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
    private accessToken;
    private ytvdourl:SafeResourceUrl;
    private pwidth;
    private pheight;

  constructor(private navCtrl: NavController,private _navParams: NavParams,private _http: Http,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController,public toastCtrl: ToastController,public sanitizer:DomSanitizationService,public platform: Platform) {
    this.itemdet=this._navParams.get("item");

      this.pwidth = 480;
      this.pheight = 360;

      platform.ready().then((readySource) => {
          this.pwidth = platform.width();
          this.pheight = (parseInt(this.pwidth)*3)/4;
      });

      if(this.itemdet.type == 'mp4'){
          this.videourl="http://torqkd.com/uploads/video/converted/"+this.itemdet.value;
          this.poster=this.itemdet.img_src;
      }
      if(this.itemdet.type != 'mp4'){
          this.ytvdourl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.itemdet.value+'?controls=1&autoplay=1&ref=0');
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

    showSocilaShareList(item){
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Share',
            cssClass : 'socilashareactionsheet',
            buttons: [
                {
                    text: '',
                    handler: () => {
                        Facebook.login(["email","public_profile"]).then((result) => {

                            if(result.status == 'connected'){
                                this.accessToken = result.authResponse.accessToken;
                                if(item.type == 'mp4'){
                                    let modal = this.modalCtrl.create(Fbcomment1Page, {
                                        "item": item, "accessToken" : this.accessToken
                                    });

                                    modal.present();

                                }else if(item.type == 'youtube'){
                                    let modal = this.modalCtrl.create(Fbcomment1Page, {
                                        "item": item, "accessToken" : this.accessToken
                                    });

                                    modal.present();
                                }





                            }else{
                                alert('An Error occured in FB Login');
                            }
                        });
                    }
                },
                {
                    text: '',
                    handler: () => {

                        var sType = 'text';
                        if(item.type == 'image'){
                            sType = 'statImg';
                        }

                        var inAppBrowserRef;

                        if(item.type == 'mp4'){
                            let modal = this.modalCtrl.create(TwcommentPage, {
                                "item": item
                            });
                            modal.present();

                        }else if(item.type == 'youtube'){
                            let modal = this.modalCtrl.create(TwcommentPage, {
                                "item": item
                            });
                            modal.present();
                        }

                    }
                },
                {
                    text: '',
                    handler: () => {
                        var inAppBrowserRef;
                        inAppBrowserRef = InAppBrowser.open('http://pinterest.com/pin/create/button/?url=http://torkq.com/&media='+item.img_src+'&description=',  '_blank', 'location=no');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

}
