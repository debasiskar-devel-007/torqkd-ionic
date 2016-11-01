import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import * as $ from "jquery";
import {UserpopupPage} from "../userpopup/userpopup";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

/*
  Generated class for the FriendsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/friends/friends.html',
})
export class FriendsPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;
  private loggedinuser;
  private local:LocalStorage;
  private friendist;
  private itemlist;
  private userImage;
  private selecthtml;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;

      if(value!=null) {
        this.getUsers();
        this.userImage = JSON.parse(value).user_image;
      }
      else{
        $('ion-content').removeClass('hide');
      }
    });

    var link = 'http://torqkd.com/user/ajs2/getsports1';
    var data = {};



    this._http.post(link, data)
        .subscribe(res => {
          this.selecthtml = res.text();
          $('#select-search').append(res.text());
        }, error => {
          console.log("Oooops!");
        });



  }


  openmenu(){
    $('.navmenul').click();
  }

  getUsers(){
    var link = 'http://torqkd.com/user/ajs2/getFriendDetNew/userid/'+this.loggedinuser+'/sessId/'+this.loggedinuser;
    var data = {};



    this._http.post(link, data)
        .subscribe(res => {
          this.friendist = res.json();
          this.itemlist = res.json();
        }, error => {
          console.log("Oooops!");
        });
  }

  getItems(ev){
    var val1 = ev.target.value;

    if (val1 && val1.trim() != '') {
      this.itemlist = this.friendist.filter((item) => {
        return (item.user_name.toLowerCase().indexOf(val1.toLowerCase()) > -1);
      })
    }else{
      this.itemlist = this.friendist;
    } 

  }

  changeasd(ev){
    var val1 = ev.target.value;

    if (val1 && val1.trim() != '') {
      this.itemlist = this.friendist.filter((item) => {
        console.log('sss : '+item.spList);
        console.log('sss : '+item.spList.length);
        return (item.spList.indexOf(val1) > -1);
      })
    }else{
      this.itemlist = this.friendist;
    }

  }

  gettrust(content){
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }


  godetails(item){
    /*let modal = this.modalCtrl.create(UserpopupPage, {
      "item": item , "redirectpage" : 'friends'
    });

    modal.present();*/
    this.navCtrl.push(UserpopupPage, { "item": item , "redirectpage" : 'friends'});
  }

  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
  }
}
