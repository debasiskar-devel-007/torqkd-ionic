import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";

/*
  Generated class for the EventmapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/eventmap/eventmap.html',
})
export class EventmapPage {
  private loggedinuser;
  private local:LocalStorage;
  private items;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;

      if(value!=null) {
        this.getevents();
      }
      else{
        $('ion-content').removeClass('hide');
      }
    });

  }

  openmenu(){
    $('.navmenul').click();
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


  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
  }


}
