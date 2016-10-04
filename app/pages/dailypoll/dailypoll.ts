import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform, AlertController} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import * as $ from "jquery";
import {DailypollresultPage} from "../dailypollresult/dailypollresult";

/*
  Generated class for the DailypolPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/dailypoll/dailypoll.html',
})
export class DailypollPage {
  private loggedinuser;
  private local:LocalStorage;
  private itemlist;
  private totalitem;
  private currentindex;
  private currentitem;
  private selAnswer;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController,private alertCtrl: AlertController) {
    this.currentindex = 0;

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {


      if(value!=null) {
        this.loggedinuser=JSON.parse(value).id;
        this.getPolls();
      }
      else{
        this.loggedinuser = 0;
        $('ion-content').removeClass('hide');
      }
    });
  }

  getPolls(){
    var link = 'http://torqkd.com/user/ajs2/getpolldetnew';
    var data = { user_id : this.loggedinuser};

    this._http.post(link, data)
        .subscribe(res => {
          this.itemlist = res.json();
          this.totalitem = this.itemlist.length;
          console.log(this.totalitem);
          if(this.totalitem > 0){
            this.currentitem = this.itemlist[this.currentindex];
          }

          console.log(this.currentitem.sel_ans);

        }, error => {
          console.log("Oooops!");
        });
  }

  votepoll(){

      if(typeof (this.selAnswer) != 'undefined' && this.selAnswer > 0){
          if(this.selAnswer != this.currentitem.sel_ans){
              var link = 'http://torqkd.com/user/ajs2/savevotenew';
              var data = { poll_id : this.currentitem.ques_id, ans_id : this.selAnswer, user_id : this.loggedinuser };

              this._http.post(link, data)
                  .subscribe(res => {
                      this.currentitem.sel_ans = this.selAnswer;
                      this.selAnswer = 0;
                      this.nextpoll();
                  }, error => {
                      console.log("Oooops!");
                  });
          }else {
              this.nextpoll();
          }
      }else{
          if(this.currentitem.sel_ans !=0){
              this.nextpoll();
          }else{
              let alert = this.alertCtrl.create({
                  title: 'Select Answer',
                  subTitle: 'First select your answer then click VOTE button.',
                  cssClass : 'vote-alert-class',
                  buttons: ['OK']
              });
              alert.present();
          }
      }


  }

    getsanitizerstyle(imgsrc){
        var content = 'http://torqkd.com/uploads/pollback/thumb/'+imgsrc;
        return this.sanitizer.bypassSecurityTrustStyle('url(' + content + ')');
    }

    changeRadio(ev){
        this.selAnswer = ev;
    }

    nextpoll(){
        if(this.currentindex == (parseInt(this.totalitem)-1)){
            this.currentindex = 0;
        }else{
            this.currentindex = parseInt(this.currentindex)+1;
        }

        this.currentitem = this.itemlist[this.currentindex];
        console.log(this.currentitem.sel_ans);
    }

    viewResult(){
        let modal = this.modalCtrl.create(DailypollresultPage, {
            "item": this.currentitem
        });

        modal.present();
    }


}
