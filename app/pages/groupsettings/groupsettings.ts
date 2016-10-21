import {Component, ViewChild} from "@angular/core";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Splashscreen, InAppBrowser, ImagePicker} from "ionic-native";
import {Http, Headers} from "@angular/http";
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams} from "ionic-angular";
import * as $ from "jquery";
import {DomSanitizationService} from "@angular/platform-browser";
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {GroupdetailsPage} from "../groupdetails/groupdetails";
import {GroupmembersPage} from "../groupmembers/groupmembers";
import {GroupstatPage} from "../groupstat/groupstat";

/*
  Generated class for the GroupsettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/groupsettings/groupsettings.html',
})
export class GroupsettingsPage {

  private groupdetailspage = GroupdetailsPage;
  private groupmemberspage = GroupmembersPage;
  private groupstatpage = GroupstatPage;

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

  private groupid;
  public banner1data;
  public banner2data;
  private local:LocalStorage;
  private groupdet;
  private loggedinuser;
  private isMember;
  private isAdmin;

  constructor(fb: FormBuilder,public platform: Platform,navCtrl: NavController,private _http: Http ,public modalCtrl: ModalController ,sanitizer:DomSanitizationService ,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController,public params: NavParams) {
    this.groupid = this.params.get('id');

    console.log(this.groupid);

    this.isMember = 0;
    this.isAdmin = 0;

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;

      this.getGroupdet()
      if(value!=null) {
        console.log(1);
      }
      else{
        $('ion-content').removeClass('hide');
      }
    }).catch((err)=>{
      this.loggedinuser = 0;
      this.getGroupdet();
    });

    /***************banner slider [start]********************/
    var link2 = 'http://torqkd.com/user/ajs2/getProfilebanners';
    var data2 = {pageid: 4,sp_id:0};



    this._http.post(link2, data2)
        .subscribe(res2 => {
          this.banner1data=res2.json().banner1;
          this.banner2data=res2.json().banner2;
        }, error => {
          console.log("Oooops!");
        });
    /***************banner slider [end]********************/



  }

  openmenu(){
    $('.navmenul').click();
  }
  launch(url){

    InAppBrowser.open(url,  '_system', 'location=yes');
  }
  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
  }

  getGroupdet(){
    var link2 = 'http://torqkd.com/user/ajs2/getGroupDet';
    var data2 = {id: this.groupid, sess_user:this.loggedinuser};



    this._http.post(link2, data2)
        .subscribe(res2 => {
          this.groupdet=res2.json();

          if(this.groupdet.is_member > 0){
            this.isMember = 1;
            if(this.groupdet.is_member == 2)
              this.isAdmin = 1;
          }

        }, error => {
          console.log("Oooops!");
        });
  }

  joingroup(){
    var link2 = 'http://torqkd.com/user/ajs2/joingroup';
    var data2 = {groupid: this.groupid, userid:this.loggedinuser};



    this._http.post(link2, data2)
        .subscribe(res2 => {
          this.isMember = 1;
        }, error => {
          console.log("Oooops!");
        });
  }

  leavegroup(){
    var link2 = 'http://torqkd.com/user/ajs2/leavegroup';
    var data2 = {groupid: this.groupid, userid:this.loggedinuser};



    this._http.post(link2, data2)
        .subscribe(res2 => {
          this.isMember = 0;
          this.isAdmin = 0;
        }, error => {
          console.log("Oooops!");
        });
  }


}
