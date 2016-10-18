import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {ForumListPage} from "../forumlist/forumlist";
import {ForumDetailsPage} from "../forumdetails/forumdetails";
import * as $ from "jquery";
import {TopicdetailsPage} from "../topicdetails/topicdetails";
import {CommonPopupPage} from "../commonpopup/commonpopup";

/*
  Generated class for the ForumPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/forum/forum.html',
})
export class ForumPage {
  private loggedinuser;
  private userdetails;
  private local:LocalStorage;
  private forumlist;
  private forumlistpage = ForumListPage;
  private forumdetailspage = ForumDetailsPage;
  private topicdetailspage = TopicdetailsPage;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      if(value!=null) {
        this.loggedinuser= JSON.parse(value).id;
        this.userdetails = JSON.parse(value);
      }
      else{
        this.loggedinuser= 0;
      }
      this.getForumList();
    });
  }

  openmenu(){
    $('.navmenul').click();
  }

  getForumList(){
    var link = 'http://torqkd.com/user/ajs2/getForumList';
    var data = { id : 0 };



    this._http.post(link, data)
        .subscribe(res => {
          this.forumlist = res.json();
        }, error => {
          console.log("Oooops!");
        });

  }

  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
  }

}
