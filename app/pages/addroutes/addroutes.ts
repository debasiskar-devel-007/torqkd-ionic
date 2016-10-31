import { Component } from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams,ActionSheetController} from "ionic-angular";
import * as $ from "jquery";
import {DomSanitizationService} from "@angular/platform-browser";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';
import {Addroutes2Page} from '../addroutes2/addroutes2';

/*
  Generated class for the AddroutesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/addroutes/addroutes.html',
})
export class AddroutesPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;

  public issportshow = false;
  public islocationshow = false;
  public sportsId;
  public sportsName;
  public locationName;

  private local:LocalStorage;
  private loggedinuser;

  private splist;


  constructor(private navCtrl: NavController,public modalCtrl: ModalController,private _http: Http,public actionSheetCtrl: ActionSheetController,public sanitizer:DomSanitizationService) {

      this.sportsId = 0;
      this.locationName = '';

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      if(value!=null) {
        this.loggedinuser=JSON.parse(value).id;
      }
      else{
        this.loggedinuser = 0;
      }
    }).catch((err)=>{
      this.loggedinuser = 0;
    });

    /****************Sport List********************/
    var link3 = 'http://torqkd.com/user/ajs2/allsports';
    var data3 = {};



    this._http.post(link3, data3)
        .subscribe(res3 => {
          this.splist = res3.json();
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

  addhideclass(hparam){
    if(typeof (hparam) == 'undefined'){
      return 'hide';
    }else{
      if(!hparam){
        return 'hide';
      }
    }

    return '';
  }

  getsanitcontent(content){
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  selsports(item){
    this.sportsId = item.id;
    this.sportsName = item.name;

    this.issportshow = !this.issportshow;
    this.islocationshow = !this.islocationshow

  }

    changelocname(keyval){
        this.locationName = keyval;
    }

  gotostep2(){
    if(this.sportsId == 0){
      alert('Please select sport.');
      return false;
    }
    if(this.locationName == ''){
      alert('Please enter location name.');
      return false;
    }

    this.navCtrl.push(Addroutes2Page, {sportsId: this.sportsId ,locationName : this.locationName });

  }

}
