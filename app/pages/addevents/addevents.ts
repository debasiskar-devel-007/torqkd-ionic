import { Component } from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams,ActionSheetController} from "ionic-angular";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {ImagePicker, CaptureImageOptions, MediaFile, CaptureError, CaptureVideoOptions,MediaCapture,ScreenOrientation, Transfer,Camera,StreamingMedia, StreamingVideoOptions} from 'ionic-native';
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

/*
  Generated class for the AddeventsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/addevents/addevents.html',
})
export class AddeventsPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;
  private addGroupForm:FormGroup;
  private local:LocalStorage;
  private loggedinuser;
  private imagepath;
  private filepath;
  private imagename;
  private sportsid;
  private sportlist;

  constructor(public fb: FormBuilder,private navCtrl: NavController,public modalCtrl: ModalController,private _http: Http,public actionSheetCtrl: ActionSheetController) {

    this.imagename = '';
    this.sportsid = 0;

    this.addGroupForm = fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      type: ["", Validators.required],
    });

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;
    }).catch((err)=>{
      this.loggedinuser = 0;
    });

    /****************Sport List********************/
    var link3 = 'http://torqkd.com/user/ajs2/allsports';
    var data3 = {};



    this._http.post(link3, data3)
        .subscribe(res3 => {
          this.sportlist = res3.json();
        }, error => {
          console.log("Oooops!");
        });
    /****************Sport List********************/

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
  selsports(id){
    this.sportsid = id;
  }
  zxczx(id){
    return ( id == this.sportsid) ? 'activeimg' : '';
  }

}
