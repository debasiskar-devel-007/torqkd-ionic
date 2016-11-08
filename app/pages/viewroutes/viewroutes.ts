import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,AlertController, ToastController} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {Splashscreen, InAppBrowser, Facebook} from "ionic-native";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';
import {AddroutesPage} from '../addroutes/addroutes';

/*
  Generated class for the ViewroutesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/viewroutes/viewroutes.html',
})
export class ViewroutesPage {
    public homepage = HomePage;
    public updateprofilepage = UpdateprofilePage;
    public addroutespage = AddroutesPage;
  private loggedinuser;
  private local:LocalStorage;
  private userImage;
  private routesoffset;
  private routesdata;
  private totatcount;
  private noofroutes;

  constructor(private navCtrl: NavController,private _http: Http,public alertCtrl: AlertController,public modalCtrl: ModalController, public toastCtrl: ToastController) {
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      if(value!=null) {
        this.loggedinuser=JSON.parse(value).id;
        this.userImage = JSON.parse(value).user_image;

        this.routesoffset = 0;
        this.getRoutes();

      }
      else{
        this.loggedinuser = 0;
      }
    });

  }

    openmenu(){
        $('.navmenul').click();
    }

  getRoutes(){
    var link = 'http://torqkd.com/user/ajs2/getRoutes';
    var data = {offset:this.routesoffset,userid : this.loggedinuser};

    this._http.post(link, data)
        .subscribe(res => {
          var routeslist = res.json().routes;
          this.totatcount = res.json().totalCount;
          this.noofroutes = routeslist.length;

          if(this.routesoffset > 0){
            this.routesdata=this.routesdata.concat(routeslist);
              this.loadmaps(routeslist);
          }else{
            this.routesdata = routeslist;
              this.loadmaps(routeslist);
          }

          this.routesoffset = parseInt(this.routesoffset)+5;

        }, error => {
          console.log("Oooops!");
        });

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

                    locations[statusd[x].id]=(statusd[x].location);
                    markerp[statusd[x].id]=(statusd[x].marker);


                    var myOptions = {
                        zoom: 10,
                        center: new google.maps.LatLng(52.21454000000001, 0.14044490000003407),
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                        scrollwheel:false,
                        mapTypeControlOptions: {
                            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE]
                        },
                        disableDefaultUI: true
                    }
                    map[statusd[x].id] = new google.maps.Map(document.getElementById('viewroutemap'+statusd[x].id), myOptions);


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

                            var curP = new google.maps.LatLng(locations[statusd[x].id][n]['latitude'] , locations[statusd[x].id][n]['longitude']);

                            bounds[statusd[x].id].extend(curP);

                            path[statusd[x].id].push(curP);
                            if(path[statusd[x].id].getLength() === 1) {
                                poly[statusd[x].id].setPath(path[statusd[x].id]);
                                map[statusd[x].id].setCenter(curP);
                                marker = new google.maps.Marker({
                                    map: map[statusd[x].id],
                                    position: curP,
                                    icon:'http://torqkd.com/images/map-icon.png',
                                    //title:address[statusd[x].id]
                                });
                            }
                        }

                        poly[statusd[x].id].setMap(map[statusd[x].id]);

                    }

                    else {
                        var curP = new google.maps.LatLng(markerp[statusd[x].id][0]['latitude'], markerp[statusd[x].id][0]['longitude']);


                        bounds[statusd[x].id].extend(curP);
                        marker = new google.maps.Marker({
                            map: map[statusd[x].id],
                            position: curP,
                            icon:'http://torqkd.com/images/map-icon.png',
                            //title:address[statusd[x].id]
                        });
                    }
                    map[statusd[x].id].fitBounds(bounds[statusd[x].id]);
                    map[statusd[x].id].setZoom( map[statusd[x].id].getZoom());
                    google.maps.event.trigger(map[statusd[x].id], 'resize');

            }
        },5000);

    }

    delRoute(item){
        let confirm = this.alertCtrl.create({
            title: '',
            message: 'CONFIRM DELETING ROUTE.',
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.delRouteconfirm(item);
                    }
                },
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancelled');
                    }
                }
            ]
        });
        confirm.present();
    }

    delRouteconfirm(item){
        var idx1 = this.routesdata.indexOf(item);

        var link = 'http://torqkd.com/user/ajs2/delroute';
        var data = {route_id: item.id};


        this._http.post(link, data)
            .subscribe(data => {
                this.routesdata.splice(idx1,1);
                this.routesoffset = parseInt(this.routesoffset)-1;
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

    fbShare(item){
        Facebook.login(["email","public_profile"]).then((result) => {
            if(result.status == 'connected'){

                var obj = {
                    method: "share",
                    href: 'http://torkq.com/singlepost.php?id=0&route_image='+item.image_name,
                    display : 'popup'
                };
                Facebook.showDialog(obj).then((res) => {
                    let toast = this.toastCtrl.create({
                        message: 'Posted Successfully On Facebook',
                        duration: 3000,
                        position : 'middle',
                        cssClass : 'social-share-success'
                    });

                    toast.present();
                });
            }else{
                alert('An Error occured in FB Login');
            }
        })
    }

    twShare(item){
        let browser = new InAppBrowser('http://torqkd.com/user/ajs2/twittershare2?image='+item.image_name+'&page=profile&com=&userid=0&type=route',  '_blank');
    }

    prShare(item){
        let browser = new InAppBrowser('http://pinterest.com/pin/create/button/?url=http://torkq.com/&media='+item.image_path+'&description=', '_blank');
    }



}
