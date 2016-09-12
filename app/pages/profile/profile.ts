import { Component,ViewChild } from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import {ProfilePage} from '../profile/profile'
import {Control} from "@angular/common";
import {StatusBar, Splashscreen,InAppBrowser,GoogleMap, GoogleMapsEvent} from 'ionic-native';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,NavController,Nav ,Content,ModalController} from 'ionic-angular';
import * as $ from "jquery";
import {HomePage} from "../home/home";
import {HomevideomodalPage} from "../homevideomodal/homevideomodal";
//import * as $ from "jquery";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/profile/profile.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class ProfilePage {
  @ViewChild(Nav) nav: Nav;
    @ViewChild(Content)
    content:Content;
  public _loginUrl:string = "http://torkq.com/login";
  private loginForm:FormGroup;
  public banner1data;
  public banner2data;
  private data;
  private isloggedin;
  private data1;
  private statdata;
  private statusdata;
  private loggedinuser;
  private local:LocalStorage;
  //profilePage=ProfilePage;

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

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http ,public modalCtrl: ModalController ) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });


   /* this._http.get("http://torqkd.com/user/ajs2/getAllBanner")
        .subscribe(data => {
          console.log(data.json());
          // /alert(data.json());
          //this.nav.present(alert);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });*/





    //var headers = new Headers();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');

    var link = 'http://torqkd.com/user/ajs2/getProfilebanners';
    //var data = $.param({email: event.email,password:event.password});
    //var data = JSON.stringify({email: event.email,password:event.password});
    var data = {pageid: 3,sp_id:0};



    this._http.post(link, data)
        .subscribe(data => {
          // /this.data1.response = data.json();
          //console.log(data);
          if(data.json()==null){
            //this.verifylogin=false;

            return;
          }
          else{

            console.log(data.json());
            console.log(data.json().banner1);
            console.log(data.json().banner2);
            this.banner1data=data.json().banner1;
            this.banner2data=data.json().banner2;
            //console.log(data.json());


          }
        }, error => {
          console.log("Oooops!");
        });


      this.local = new Storage(LocalStorage);

      this.local.get('userinfo').then((value) => {
          this.loggedinuser=JSON.parse(value).id;
          console.log(JSON.parse(value).id);
          if(value!=null) {

              //this.navpage();
              this.isloggedin=true;

              //return;
              // /$('.exp').click();
              //alert(value);
              //this.router.navigate(['<aliasInRouteConfig>']);
          }
          else{
              $('ion-content').removeClass('hide');
              this.isloggedin=false;
          }
      });

      this.local = new Storage(LocalStorage);

      this.local.get('userinfo').then((value) => {
          //alert(value)
          if(value!=null) {

              //this.navpage();
              this.isloggedin=true;
              $('.has-header').removeClass('hide');
              this.ionViewDidEnter();
              //$('.navmenur').addClass('hide');
              //$('.navmenul').removeClass('hide');

              //return;
              // /$('.exp').click();
              //alert(value);
              //this.router.navigate(['<aliasInRouteConfig>']);
          }
          else{

              this.isloggedin=false;
          }
      });





  }

    launchVideo(url,poster) {
        let modal = this.modalCtrl.create(HomevideomodalPage, {
            "url": "http://torqkd.com/uploads/video/converted/"+url,
            "poster": poster
        });

        modal.present();
    }


    ionViewDidEnter() {


        console.log('ionViewDidEnter');

        if (Splashscreen) {
            setTimeout(() => {
                Splashscreen.hide();
            }, 100);
        }
        console.log(this.isloggedin);
        if(!this.isloggedin)this.navCtrl.setRoot(HomePage);
        else{

            var link1 = 'http://torqkd.com/user/ajs2/getStatusnStat/sess_user/'+this.loggedinuser+'/userid/'+this.loggedinuser;
            //var data = $.param({email: event.email,password:event.password});
            //var data = JSON.stringify({email: event.email,password:event.password});
            var data1 = {sess_user :this.loggedinuser ,userid:this.loggedinuser};



            this._http.post(link1, data1)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    //console.log(data);
                    if(data.json()==null){
                        //this.verifylogin=false;

                        return;
                    }
                    else{

                        console.log(data.json());
                        console.log(data.json().statdet);
                        //console.log(data.json().banner2);
                        this.statdata=data.json().statdet;
                        this.statusdata=data.json().status;

                        this.loadmaps(this.statusdata);
                        //this.banner2data=data.json().banner2;
                        //console.log(data.json());


                    }
                }, error => {
                    console.log("Oooops!");
                });

        }

    }
    loadmaps(statusd){
        setTimeout(function () {

            var x;
            let map = new Array();
            let poly = new Array();
            let locations = new Array();
            let points = new Array();
            let path = new Array();
            let address = new Array();
            let markers = new Array();
            let bounds = new Array();
            let markerp = new Array();
            let marker;

            for (x in statusd) {
                bounds[statusd[x].id] = new google.maps.LatLngBounds();
                //console.log(statusd[x]);
                if (statusd[x].type == 'route') {
                   // console.log(statusd[x].id + 'routeid');
                   // console.log('map' + statusd[x].id);
                    console.log(statusd[x].routes);
                    //console.log(statusd[x].routes.date);
                    //console.log(statusd[x].routes.id);
                    locations[statusd[x].id]=(statusd[x].routes.location);
                    markerp[statusd[x].id]=(statusd[x].routes.marker);
                    //console.log(statusd[x].routes.location.length);

                    /* map[statusd[x].id] = new GoogleMap('map' +statusd[x].id, {
                     // Map Options: https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions
                     });

                     map[statusd[x].id].on(GoogleMapsEvent.MAP_READY).subscribe(() => {
                     console.log('Map is ready!'+statusd[x].id);
                     map[statusd[x].id].setVisible(true);
                     map[statusd[x].id].showDialog();
                     });*/

                    //var poly[statusd[x].id];

                    var myOptions = {
                        zoom: 10,
                        center: new google.maps.LatLng(52.21454000000001, 0.14044490000003407),
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                        mapTypeControlOptions: {
                            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE]
                        },
                        disableDefaultUI: true
                    }
                    map[statusd[x].id] = new google.maps.Map(document.getElementById('map'+statusd[x].id), myOptions);


                    poly[statusd[x].id] = new google.maps.Polyline({
                        geodesic: true,
                        strokeColor: '#F7931E',
                        strokeOpacity: 1.0,
                        strokeWeight: 4
                    });

                    var n;
                    path[statusd[x].id] = new google.maps.MVCArray();

                    if(locations[statusd[x].id].length>0)
                    {
                        for(n in locations[statusd[x].id]){
                            var stptggg = locations[statusd[x].id][n];
                            var setcarr = new Array();

                            //console.log(locations[statusd[x].id][n]);
                            //stptggg = stptggg.replace(/\(/g, '').replace(/\)/g, '');
                            //setcarr = stptggg.split(',');
                            var curP = new google.maps.LatLng(locations[statusd[x].id][n]['latitude'] , locations[statusd[x].id][n]['longitude']);

                            /*points[statusd[x].id].push({
                                lat:locations[statusd[x].id][n]['latitude'],
                                lng:locations[statusd[x].id][n]['longitude']
                            })*/

                            bounds[statusd[x].id].extend(curP);



                            path[statusd[x].id].push(curP);
                            if(path[statusd[x].id].getLength() === 1) {
                                poly[statusd[x].id].setPath(path[statusd[x].id]);
                                map[statusd[x].id].setCenter(curP);
                                marker = new google.maps.Marker({
                                    map: map[statusd[x].id],
                                    position: curP,
                                    icon:'http://torqkd.com/images/map-icon.png',
                                    title:address[statusd[x].id]
                                });
                            }
                        }

                        /*let flightPath = new google.maps.Polyline({
                            path: path,
                            geodesic: true,
                            strokeColor: '#F7931E',
                            strokeOpacity: 1.0,
                            strokeWeight: 4
                        });*/

                        poly[statusd[x].id].setMap(map[statusd[x].id]);


                    }

                    else {
                        var curP = new google.maps.LatLng(markerp[statusd[x].id][0]['latitude'], markerp[statusd[x].id][0]['longitude']);


                        bounds[statusd[x].id].extend(curP);
                        marker = new google.maps.Marker({
                            map: map[statusd[x].id],
                            position: curP,
                            icon:'http://torqkd.com/images/map-icon.png',
                            title:address[statusd[x].id]
                        });
                    }
                    map[statusd[x].id].fitBounds(bounds[statusd[x].id]);
                    map[statusd[x].id].setZoom( map[statusd[x].id].getZoom());



                    // /map[statusd[x].id].fitBounds(path[0].geometry.viewport);






                    //let map2 = new google.maps.Map(document.getElementById("map_canvas2"), myOptions);
                }
            }
        },5000);

    }
    launch(url){

        let browser = new InAppBrowser();
        InAppBrowser.open(url, "_system", "location=true");
    }

    openmenu(){
        console.log('dsd');
        $('.navmenul').click();
    }


    onPageScroll(event) {
        console.log(event.target.scrollTop);
        console.log('hh'+$('.login-header').height());
        if($('ion-header').height() < event.target.scrollTop) {

            //$('ion-header').css('z-index','0');
            //$('ion-content').css('z-index','3');
        }
        else {
            //$('ion-header').css('z-index','3');
            //$('ion-content').css('z-index','0');
        }
    }

    ngAfterViewInit() {
        this.content.addScrollListener(this.onPageScroll);
    }




  makeGetRequest() {
    this._http.get("https://httpbin.org/ip")
        .subscribe(data => {
          console.log(data.json());
          // /alert(data.json());
          //this.nav.present(alert);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
  }



}



