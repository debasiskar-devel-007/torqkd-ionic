import { Component } from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams,ActionSheetController} from "ionic-angular";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {ImagePicker, CaptureImageOptions, MediaFile, CaptureError, CaptureVideoOptions,MediaCapture,ScreenOrientation, Transfer,Camera,StreamingMedia, StreamingVideoOptions} from 'ionic-native';
import {HomePage} from '../home/home';
import {ProfilePage} from '../profile/profile';
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
  private addEventForm:FormGroup;
  private local:LocalStorage;
  private loggedinuser;
  private imagepath;
  private filepath;
  private imagename;
  private sportsid;
  private sportlist;
  private grouplist;
  private max;
  private allday = 0;
  public countrylist = [];
  public statelist = [];
  public stateLoad = false;

  constructor(public fb: FormBuilder,private navCtrl: NavController,public modalCtrl: ModalController,private _http: Http,public actionSheetCtrl: ActionSheetController) {

    var d = new Date();
    var n:number = d.getFullYear();

    this.max = n+3;

    this.imagename = '';
    this.sportsid = 0;

    this.addEventForm = fb.group({
      name: ["", Validators.required],
      description: [""],
      group_id: [""],
      from_date: ["", Validators.required],
      to_date: ["", Validators.required],
      location: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      zip: [""],
      country: ["", Validators.required],
      state: ["", Validators.required],
      register_url: [""],
      start_time: ["09:00", Validators.required],
      end_time: ["09:00", Validators.required],
      all_day: [false],
    });

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      if(value!=null) {
        this.loggedinuser=JSON.parse(value).id;
      }else{
        this.navCtrl.push(HomePage);
      }
    }).catch((err)=>{
      this.navCtrl.push(HomePage);
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

    /****************group List********************/
    var link34 = 'http://torqkd.com/user/ajs2/getgroupList';
    var data34 = {};



    this._http.post(link34, data34)
        .subscribe(res34 => {
          this.grouplist = res34.json();
        }, error => {
          console.log("Oooops!");
        });
    /****************group List********************/

    /****************country list********************/
    var link35 = 'http://torqkd.com/user/ajs2/getCountryList';
    var data35 = {};



    this._http.post(link35, data35)
        .subscribe(res35 => {
          this.countrylist = res35.json();
        }, error => {
          console.log("Oooops!");
        });
    /****************country List********************/



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

  handleChange(event){
    if(event._checked){
      this.allday = 1;
    }else{
      this.allday = 0;
    }
  }

  formsubmit(event){
    let x: any;

    for (x in this.addEventForm.controls) {
      this.addEventForm.controls[x].markAsTouched();
    }

    if(this.sportsid == 0){
      alert('Please select sport.');
      return;
    }

    if (this.addEventForm.valid) {

      var link = 'http://torqkd.com/user/ajs2/addevent';
      var data = {name:event.name,location:event.location,address:event.address,city:event.city,state:event.state,country:event.country,from_date:event.from_date,to_date:event.to_date,sports_id:this.sportsid,description:event.description,zip:event.zip,register_url:event.register_url,all_day:this.allday,start_time:event.start_time,end_time:event.end_time,user_id:this.loggedinuser,group_id:event.group_id};



      this._http.post(link, data)
          .subscribe(res => {

            var sdfs:string = res.text();
            if(sdfs == '0'){
              alert('Error ocurred');
            }else{
              this.navCtrl.push(ProfilePage, {});
            }

          }, error => {
            console.log("Oooops!");
          });


    }  }

  changecountry(countryval){
    this.statelist = [];

    if(countryval != ''){
      this.stateLoad = true;
      var link3 = 'http://torqkd.com/user/ajs2/getStateList';
      var data3 = {id:countryval};



      this._http.post(link3, data3)
          .subscribe(res3 => {
            this.statelist = res3.json();
            this.stateLoad = false;
          }, error => {
            console.log("Oooops!");
            this.stateLoad = false;
          });
    }

  }

}
