import {Component, ViewChild} from "@angular/core";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Splashscreen, InAppBrowser, ImagePicker} from "ionic-native";
import {Http, Headers} from "@angular/http";
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,NavParams} from "ionic-angular";
import * as $ from "jquery";
import {HomePage} from "../home/home";
import {HomevideomodalPage} from "../homevideomodal/homevideomodal";
import {SocialcommentPage} from "../socialcomment/socialcomment";
import {ProfilePage} from "../profile/profile";
import {profilegroupPage} from "../profilegroup/profilegroup";
import {tagpeoplelistPage} from "../tagpeoplelist/tagpeoplelist";
import {socialtaglistPage} from "../socialtaglist/socialtaglist";
import {DomSanitizationService} from "@angular/platform-browser";
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import {CommonPopupPage} from "../commonpopup/commonpopup";
//import {ProfilePage} from '../profile/profile'
//import * as $ from "jquery";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/eventdetails1/eventdetails1.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class eventDetailsPage {
    @ViewChild(Nav) nav: Nav;
    @ViewChild(Content)
    content:Content;
    private isloggedin;
    private eventid;
    public evetDet;
    private loggedinuser;
    sanitizer;
    public eventdet;
    public navCtrl;

    constructor(fb: FormBuilder,public platform: Platform,navCtrl: NavController,private _http: Http ,public modalCtrl: ModalController ,sanitizer:DomSanitizationService ,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController,public params: NavParams) {
        this.navCtrl = navCtrl;

        platform.registerBackButtonAction(() => {

            this.navCtrl.pop();

        });

        this.sanitizer=sanitizer;
        this.eventid = this.params.get('id');
        this.eventdet = {};


        var link = 'http://torqkd.com/user/ajs2/getEventDet';
        var data = {id: this.eventid};



        this._http.post(link, data)
            .subscribe(data => {
                if(data.json()==null){

                    return;
                }
                else{

                    this.eventdet =data.json();
                    console.log(this.eventdet);

                    var contentString = '<div class="event-infowindow">\
                        <h1 id="firstHeading" class="firstHeading">\
                        '+this.eventdet.name+'<br/>\
                    <span>'+this.eventdet.address+', '+this.eventdet.city+', '+this.eventdet.state+'</span></h1>\
                    <div>'+this.eventdet.imageTag+'</div>\
                        </div>';


                    /************************Load Map [start]*********************************/
                    var centerpos = new google.maps.LatLng(this.eventdet.latitude, this.eventdet.longitude);
                    var myOptions = {
                        zoom: 12,
                        center: centerpos,
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                        scrollwheel:false,
                        mapTypeControlOptions: {
                            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE]
                        },
                        disableDefaultUI: true
                    }

                    var map = new google.maps.Map(document.getElementById('map'), myOptions);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: centerpos,
                        icon:'http://torqkd.com/images/map-icon.png',
                        //title:address[statusd[x].id]
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });

                    /************************Load Map [end]***********************************/

                }
            }, error => {
                console.log("Oooops!");
            });



    }

    gotoback(){
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    }

    addhideclass(hparam){
        if(typeof (hparam) == 'undefined'){
            return 'hide';
        }else{
            if(!hparam){
                return 'hide';
            }
        }

        return '';
    }

    getsantizecontent(content){
        return this.sanitizer.bypassSecurityTrustHtml(content);
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


}



