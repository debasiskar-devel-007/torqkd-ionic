import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams,AlertController } from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {ForumPage} from "../forum/forum";
import {ForumListPage} from "../forumlist/forumlist";
import {ForumDetailsPage} from "../forumdetails/forumdetails";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

/*
  Generated class for the TopicnewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/topicnew/topicnew.html',
})
export class TopicnewPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;
  private loggedinuser;
  private userdetails;
  private local:LocalStorage;
  private topicnewForm:FormGroup;
  private forumpage=ForumPage;
  private forumdetailspage = ForumDetailsPage;
  private forumid;

  constructor(fb: FormBuilder,private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController,private _navParams: NavParams,public alertCtrl: AlertController) {
    this.forumid=this._navParams.get("id");

    this.topicnewForm = fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required]
    });

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      if(value!=null) {
        this.loggedinuser= JSON.parse(value).id;
        this.userdetails = JSON.parse(value);
      }
      else{
        this.loggedinuser= 0;
      }
    });
  }

  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
  }

  addNewTopic(fval){


    let x:any;
    console.log(this.topicnewForm.value.dob);

    for(x in this.topicnewForm.controls){
      this.topicnewForm.controls[x].markAsTouched();

    }

    if(this.topicnewForm.valid){
      var link = 'http://torqkd.com/user/ajs2/addnewTopic';
      var data = {description : fval.description,forumId : this.forumid, parentId : 0, sess_user : this.loggedinuser, title :fval.title};

      this._http.post(link, data)
          .subscribe(data1 => {

            this.navCtrl.push(ForumDetailsPage, {
              id: this.forumid
            });

          }, error => {
            console.log("Oooops!");
          });
    }

  }

}