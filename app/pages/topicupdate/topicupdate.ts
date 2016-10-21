import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams,AlertController } from "ionic-angular";
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {ForumPage} from "../forum/forum";
import {ForumListPage} from "../forumlist/forumlist";
import {ForumDetailsPage} from "../forumdetails/forumdetails";
import {TopicdetailsPage} from "../topicdetails/topicdetails";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";

/*
  Generated class for the TopicupdatePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/topicupdate/topicupdate.html',
})
export class TopicupdatePage {
  private loggedinuser;
  private userdetails;
  private local:LocalStorage;
  private topicnewForm:FormGroup;
  private forumpage=ForumPage;
  private forumdetailspage = ForumDetailsPage;
  private topicdetailspage = TopicdetailsPage;
  private forumid;
  private topicid;
  private topicdet;

  constructor(fb: FormBuilder,private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController,private _navParams: NavParams,public alertCtrl: AlertController) {
    this.topicid=this._navParams.get("id");

    var link = 'http://torqkd.com/user/ajs2/getTopicDet';
    var data = {id : this.topicid};

    this.topicnewForm = fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required]
    });

    this._http.post(link, data)
        .subscribe(data1 => {

          this.topicdet = data1.json();

          (<FormControl>this.topicnewForm.controls['title']).updateValue(this.topicdet.title);
          (<FormControl>this.topicnewForm.controls['description']).updateValue(this.topicdet.description);

          this.forumid = this.topicdet.forum_id;

        }, error => {
          console.log("Oooops!");
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
      var link = 'http://torqkd.com/user/ajs2/updateTopic';
      var data = {id:this.topicid , description : fval.description, title :fval.title};

      this._http.post(link, data)
          .subscribe(data1 => {

            this.navCtrl.push(TopicdetailsPage, {
              id: this.topicid
            });

          }, error => {
            console.log("Oooops!");
          });
    }

  }

}
