import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,LoadingController} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {TorqkdtvPage} from "../torqkdtv/torqkdtv";
import {PhotoPage} from "../photo/photo";
import {Splashscreen, InAppBrowser,YoutubeVideoPlayer,StreamingMedia, StreamingVideoOptions} from "ionic-native";
import {ExperiencePage} from "../experience/experience";
import {ExpeventlistPage} from "../expeventlist/expeventlist";
import {ExpstatlistPage} from "../expstatlist/expstatlist";
import {GroupdetailsPage} from "../groupdetails/groupdetails";

/*
  Generated class for the ExpgrouplistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/expgrouplist/expgrouplist.html',
})
export class ExpgrouplistPage {

  mySlideOptions = {
    initialSlide: 0,
    loop: true,
    autoplay:4000
  };

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

  public sportslist;
  public banner1data;
  public banner2data;
  private items;
  private loggedinuser;
  private local:LocalStorage;
  public autoplay = true;
  private torqkdtvpage = TorqkdtvPage;
  private photopage = PhotoPage;
  private experiencepage = ExperiencePage;
  private expeventlistpage = ExpeventlistPage;
  private expstatlistpage = ExpstatlistPage;
  public groupdetailspage = GroupdetailsPage;

  private groupList;
  private groupcount;


  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController,public loadingCtrl: LoadingController) {

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;

      this.getevents();

      this.getGroups();

      if(value!=null) {
       console.log(1);
      }
      else{
        $('ion-content').removeClass('hide');
      }
    }).catch((err)=>{
      this.loggedinuser = 0;
      this.getevents();

      this.getGroups();
    });



    /***************sport slider [start]********************/
    var link1 = 'http://torqkd.com/user/ajs2/GetParentSports';
    var data1 = {};

    this._http.post(link1, data1)
        .subscribe(res1 => {

          this.sportslist = res1.json();

        }, error => {
          console.log("Oooops!");
        });
    /***************sport slider [end]********************/


    /***************banner slider [start]********************/
    var link2 = 'http://torqkd.com/user/ajs2/getProfilebanners';
    var data2 = {pageid: 1,sp_id:0};



    this._http.post(link2, data2)
        .subscribe(res2 => {
          this.banner1data=res2.json().banner1;
          this.banner2data=res2.json().banner2;
        }, error => {
          console.log("Oooops!");
        });
    /***************banner slider [end]********************/



  }

  launch(url){

    InAppBrowser.open(url,  '_system', 'location=yes');
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

  getsanitizerstyle(imgsrc){
    return this.sanitizer.bypassSecurityTrustStyle('url(http://torqkd.com/uploads/sports_image/additional/thumb/' + imgsrc + ')');
  }

  openDefault(){
    let options: StreamingVideoOptions = {
      successCallback: () => {  },
      errorCallback: (e) => {  },
      orientation: 'landscape'
    };

    StreamingMedia.playVideo("http://torqkd.com/uploads/Torkq_LR_061416.mp4", options);
  }



  getevents(){
    var link = 'http://torqkd.com/user/ajs2/getCurLocation2';
    var data = { 'sesh_user' : this.loggedinuser };



    this._http.post(link, data)
        .subscribe(res => {
          this.items = res.json();

          this.loadmap();

        }, error => {
          console.log("Oooops!");
        });

  }

  loadmap(){
    let poly = new Array();
    let locations = new Array();
    let points = new Array();
    let path = new Array();
    let address = new Array();
    let markers = new Array();
    let bounds = new Array();
    let markerp = new Array();
    let marker;

    var myOptions = {
      zoom: 10,
      center: new google.maps.LatLng(this.items.latitude, this.items.longitude),
      mapTypeId: google.maps.MapTypeId.HYBRID,
      scrollwheel:false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE]
      },
      disableDefaultUI: true
    }

    let map = new google.maps.Map(document.getElementById('event-map-canvas'), myOptions);

    //console.log(this.items.markers);

    let n;

    for(n in this.items.markers){
      var mdata = this.items.markers[n];
      var curP = new google.maps.LatLng(mdata.latitude,mdata.longitude);

      new google.maps.Marker({
        map: map,
        position: curP,
        icon:'http://torqkd.com/images/map-icon.png',
      });
    }

  }

  getGroups(){

    var link = 'http://torqkd.com/user/ajs2/getGroups';
    var data = {userid: 0};


    this._http.post(link, data)
        .subscribe(res => {
          var res2 = res.json();
          this.groupList = res2;
          this.groupcount = res2.length;


        }, error => {
          console.log("Oooops!");



        });

  }

  getlocGroups(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    var link = 'http://torqkd.com/user/ajs2/getLocGroups';
    var data = {userid: this.loggedinuser};


    this._http.post(link, data)
        .subscribe(res => {
          var res2 = res.json();
          this.groupList = res2;
          this.groupcount = res2.length;
          loading.dismiss();
        }, error => {
          console.log("Oooops!");
          loading.dismiss();
        });

  }
  getsugGroups(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    var link = 'http://torqkd.com/user/ajs2/getSugGroups';
    var data = {userid: this.loggedinuser};


    this._http.post(link, data)
        .subscribe(res => {
          var res2 = res.json();
          this.groupList = res2;
          this.groupcount = res2.length;
          loading.dismiss();
        }, error => {
          console.log("Oooops!");
          loading.dismiss();
        });

  }



}
