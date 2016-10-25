import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams } from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {ForumPage} from "../forum/forum";
import {ForumDetailsPage} from "../forumdetails/forumdetails";
import * as $ from "jquery";
import {TopicdetailsPage} from "../topicdetails/topicdetails";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

/*
  Generated class for the ForumPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/forumlist/forumlist.html',
})
export class ForumListPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;
  private loggedinuser;
  private userdetails;
  private local:LocalStorage;
  private forumlist;
  private forumid;
  private sportname;
  private forumpage=ForumPage;
  private forumdetailspage = ForumDetailsPage;
  private topicdetailspage = TopicdetailsPage;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController,private _navParams: NavParams) {
    this.forumid=this._navParams.get("id");
    this.sportname=this._navParams.get("title");
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
    var data = { id : this.forumid };



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
