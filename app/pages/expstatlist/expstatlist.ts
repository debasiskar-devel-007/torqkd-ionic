import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {TorqkdtvPage} from "../torqkdtv/torqkdtv";
import {PhotoPage} from "../photo/photo";
import {Splashscreen, InAppBrowser,YoutubeVideoPlayer,StreamingMedia, StreamingVideoOptions} from "ionic-native";
import {ExperiencePage} from "../experience/experience";
import {ExpeventlistPage} from "../expeventlist/expeventlist";
import {ExpgrouplistPage} from "../expgrouplist/expgrouplist";
import {statDetPage} from "../statdet/statdet";
import '../../../node_modules/chart.js/src/chart.js';
import { BaseChartComponent } from 'ng2-charts/ng2-charts';
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

/*
  Generated class for the ExpstatlistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/expstatlist/expstatlist.html',
  directives: [BaseChartComponent]
})
export class ExpstatlistPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;

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
  private expgrouplistpage = ExpgrouplistPage;

  private statdata2;
  private statcount;

  /*******************************Chat Settings [start] ******************************************/

  public lineChartOptions:any = {
    animation: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel : {
          display:true,
          labelString : 'Activity',
          fontColor : '#555555',
          fontFamily : '"veneerregular"',
          fontSize : 12
        },
        gridLines : {
          color :'#ddd',
          lineWidth : 1,
          tickMarkLength :0
        },
        ticks : {
          fontColor : '#555555',
          fontFamily : '"veneerregular"',
        }
      }],
      xAxes : [{
        gridLines : {
          display : false,
        },
        ticks : {
          fontColor : '#555555',
          fontFamily : '"veneerregular"',
        }
      }]
    },
    title: {
      display: true,
      text: 'Last 6 Months',
      fontFamily : '"veneerregular"',
      fontSize : 18,
      fontColor : '#555555'
    },
    legend : {
      position : 'bottom',
      labels : {
        fontFamily : '"veneerregular"',
        fontColor : '#555555',
        boxWidth : 0
      }
    }
  };
  public lineChartColors:Array<any> = [
    { // grey
      borderColor: 'rgba(247,146,19,1)',
      pointBackgroundColor: 'rgba(247,146,19,1)',
      pointBorderColor: 'rgb(247,146,19)',
      pointHoverBackgroundColor: 'rgb(247,146,19)',
      pointHoverBorderColor: 'rgba(247,146,19,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  /*******************************Chat Settings [end] ******************************************/



  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {

    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;

      this.getevents();

      if(value!=null) {
        console.log(1);
      }
      else{
        $('ion-content').removeClass('hide');
      }
    }).catch((err)=>{
      this.loggedinuser = 0;
      this.getevents();
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

    /*****************Get User Stat[start]**********************/
    var link5 = 'http://torqkd.com/user/ajs2/getStat';
    var data5 = {};

    this._http.post(link5, data5)
        .subscribe(res => {
          if(res.json()==null){

            return;
          }
          else{
            var res2 = res.json();
            this.statdata2 = res2;
            this.statcount = res2.length;
          }
        }, error => {
          console.log("Oooops!");
        });
    /*****************Get User Stat[start]**********************/




  }

  launch(url){

    let browser = new InAppBrowser(url, '_system');
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

  /******************Stat Chart[start]**********************/
  getLineChartData(item){

    var rdata = [
      {
        data: item.data,
        label: 'Month',
        fill:false,
        lineTension : 0,
        pointRadius : 5
      }
    ];

    return rdata;
  }
  getLineChartLabels(item){
    var rdata = item.mon;
    return rdata;
  }
  /******************Stat Chart[end]**********************/


  viewstatdet(item){
    console.log(item.statDet);
    let modal = this.modalCtrl.create(statDetPage, {
      "item": item.statDet,
    });

    modal.present();
  }
}
