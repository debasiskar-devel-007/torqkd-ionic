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

    constructor(fb: FormBuilder,public platform: Platform,public navCtrl: NavController,private _http: Http ,public modalCtrl: ModalController ,sanitizer:DomSanitizationService ,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController,public params: NavParams) {
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

                }
            }, error => {
                console.log("Oooops!");
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


}



