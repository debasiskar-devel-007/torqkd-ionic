import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams } from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {ForumPage} from "../forum/forum";
import {ForumListPage} from "../forumlist/forumlist";
import {ForumDetailsPage} from "../forumdetails/forumdetails";
import * as $ from "jquery";

/*
  Generated class for the TopicdetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/topicdetails/topicdetails.html',
})
export class TopicdetailsPage {
  private loggedinuser;
  private userdetails;
  private local:LocalStorage;
  private topicdet;
  private topicid;
  private forumpage=ForumPage;
  private forumlistpage = ForumListPage;
  private forumdetailspage = ForumDetailsPage;
  private topicname;
  private forumid;
  private forumname;
  private forumcategoryid;
  private forumcategoryname;
  private isLoad;
  private topicreply;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController,private _navParams: NavParams) {
    this.topicid=this._navParams.get("id");
      this.isLoad = 0;
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      if(value!=null) {
        this.loggedinuser= JSON.parse(value).id;
        this.userdetails = JSON.parse(value);
      }
      else{
        this.loggedinuser= 0;
      }
      this.addView();
      this.getTopicHrr();
      this.getTopicDet();
    });


  }

  addView(){
    var link = 'http://torqkd.com/user/ajs2/addView';
    var data = { id : this.topicid };



    this._http.post(link, data)
        .subscribe(res => {
          console.log("Success!");
        }, error => {
          console.log("Oooops!");
        });

  }
  getTopicHrr(){
    var link = 'http://torqkd.com/user/ajs2/getTopicHArr/id/'+this.topicid;
    var data = { };



    this._http.post(link, data)
        .subscribe(res => {
          var data2 = res.json();

          this.topicname = data2.topic_title;
          this.forumid = data2.forum_id;
          this.forumname = data2.forum_name;
          this.forumcategoryid = data2.forum_category_id;
          this.forumcategoryname = data2.forum_category_name;
        }, error => {
          console.log("Oooops!");
        });

  }
  getTopicDet(){
    var link = 'http://torqkd.com/user/ajs2/getTopicDetails';
    var data = { id : this.topicid, sess_user: this.loggedinuser };



    this._http.post(link, data)
        .subscribe(res => {
          this.topicdet = res.json();
            this.topicreply = this.topicdet.topic_reply;
            this.isLoad = 1;
        }, error => {
          console.log("Oooops!");
        });

  }
    getsanitizedcontent(content){
        //console.log('content'+content);
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }


  openmenu(){
    $('.navmenul').click();
  }

}
