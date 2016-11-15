import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

/*
  Generated class for the EventmapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/eventmap/eventmap.html',
})
export class EventmapPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;
  private loggedinuser;
  private local:LocalStorage;
  private items;

  private map;

  private eventoffset;
  private latitude;
  private longitude;

  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController) {

    this.eventoffset = 0;

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
    var link = 'http://torqkd.com/user/ajs2/getCurLocationNew';
    var data = { 'sesh_user' : this.loggedinuser };



    this._http.post(link, data)
        .subscribe(res => {
          this.items = res.json();

          this.latitude = this.items.latitude;
          this.longitude = this.items.longitude;

          this.loadmap();

        }, error => {
          console.log("Oooops!");
        });

  }

  loadmap(){

    var myOptions = {
      zoom: 10,
      center: new google.maps.LatLng(this.latitude, this.longitude),
      mapTypeId: google.maps.MapTypeId.HYBRID,
      scrollwheel:false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE]
      },
      disableDefaultUI: true
    }

    var elems = document.getElementsByClassName('event-map-canvas');
    var elemlength = elems.length;

    this.map = new google.maps.Map(elems[elemlength-1], myOptions);


    this.getEvents();


    //this.map = new google.maps.Map(document.getElementById('event-map-canvas'), myOptions);

    //console.log(this.items.markers);

    /*let n;

    for(n in this.items.markers){
        var mdata = this.items.markers[n];
      this.placemarker(map,mdata);



    }*/

  }


  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
  }

  placemarker(mdata){
    var curP = new google.maps.LatLng(mdata.latitude,mdata.longitude);

    var contentString = '<div class="event-infowindow">\
                        <h1 id="firstHeading" class="firstHeading">\
                        '+mdata.name+'<br/>\
                    <span>'+mdata.address+'</span></h1>\
                    <div>'+mdata.date+'</div>\
                        </div>';

    var marker = new google.maps.Marker({
      map: this.map,
      position: curP,
      icon:'http://torqkd.com/images/map-icon.png',
      //title:address[statusd[x].id]
    });

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });

  }

  getEvents(){
    var link = 'http://torqkd.com/user/ajs2/getmapevents';
    var data = { 'latitude' : this.latitude,'longitude' : this.longitude,'offset' : this.eventoffset };



    this._http.post(link, data)
        .subscribe(res => {
          let res1 = res.json();

          let n;

          for(n in res1){
            var mdata = res1[n];
            this.placemarker(mdata);
          }

          if(res1.length){
            this.eventoffset = this.eventoffset+50;
            this.getEvents();
          }

        }, error => {
          console.log("Oooops!");
        });
  }





}
