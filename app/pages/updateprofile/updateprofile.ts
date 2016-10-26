import { Component } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {HomePage} from '../home/home';
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {UserblockPage} from "../userblock/userblock";
import {ProfilePage} from "../profile/profile";
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,ActionSheetController} from "ionic-angular";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {ControlGroup, Control} from "@angular/common";
import {ImagePicker, CaptureImageOptions, MediaFile, CaptureError, CaptureVideoOptions,MediaCapture,ScreenOrientation, Transfer,Camera,StreamingMedia, StreamingVideoOptions} from 'ionic-native';
/*
  Generated class for the UpdateprofilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/updateprofile/updateprofile.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class UpdateprofilePage {
  public homepage = HomePage;
  public profilepage = ProfilePage;
  public sportlist;
  private signUpForm:FormGroup;
  private loggedinuser;
  private local:LocalStorage;
  public countrylist = [];
  public statelist = [];
  public selsports = [];
  public stateLoad = false;
    private privacy;
    public imagepath;
    public filepath;
    public filepath1;
    public profimg_name;
    public backimg_name;


  constructor(private navCtrl: NavController,public modalCtrl: ModalController,private _http: Http,public fb: FormBuilder,public actionSheetCtrl: ActionSheetController) {


    this.signUpForm = fb.group({
      id: [""],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      email: ["", Validators.required],
      email2: [""],
      password: [""],
      password2: [""],
      location: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      state: ["", Validators.required]
    }, {validator: this.matchingPasswords('password', 'password2')});


    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      if(value!=null) {
        this.loggedinuser=JSON.parse(value).id;
        this.getuserdetails();
      }else{
        this.navCtrl.push(HomePage);
      }
    }).catch((err)=>{
      this.navCtrl.push(HomePage);
    });


    /****************country list********************/
    var link3 = 'http://torqkd.com/user/ajs2/getCountryList';
    var data3 = {};



    this._http.post(link3, data3)
        .subscribe(res3 => {
          this.countrylist = res3.json();
        }, error => {
          console.log("Oooops!");
        });
    /****************country List********************/



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

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: ControlGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

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

  getuserdetails(){
    var link3 = 'http://torqkd.com/user/ajs2/getUserDetails5';
    var data3 = {userid : this.loggedinuser };



    this._http.post(link3, data3)
        .subscribe(res3 => {
          var userdetails = res3.json();

          (<FormControl>this.signUpForm.controls['id']).updateValue(userdetails.id);
          (<FormControl>this.signUpForm.controls['fname']).updateValue(userdetails.fname);
          (<FormControl>this.signUpForm.controls['lname']).updateValue(userdetails.lname);
          (<FormControl>this.signUpForm.controls['email']).updateValue(userdetails.email);
          (<FormControl>this.signUpForm.controls['location']).updateValue(userdetails.location);
          (<FormControl>this.signUpForm.controls['city']).updateValue(userdetails.city);
          (<FormControl>this.signUpForm.controls['country']).updateValue(userdetails.country);
          (<FormControl>this.signUpForm.controls['state']).updateValue(userdetails.state);

          this.selsports = userdetails.user_sports;
            this.privacy = userdetails.privacy;

            this.filepath = userdetails.profileImg;
            this.filepath1 = userdetails.backImg;

            this.profimg_name = userdetails.profileImgName;
            this.backimg_name = userdetails.backImgName;

          this.changecountry(userdetails.country);

        }, error => {
          console.log("Oooops!");
        });
  }


  formsubmit(event) {

    let x: any;

    for (x in this.signUpForm.controls) {
      this.signUpForm.controls[x].markAsTouched();
    }

    if (this.signUpForm.valid) {

      var link = 'http://torqkd.com/user/ajs2/updateProfile';
      var data = {
        id: event.id,
        fname: event.fname,
        lname: event.lname,
        location: event.location,
        city: event.city,
        country: event.country,
        state: event.state
      };

      this._http.post(link, data)
          .subscribe(res => {

            var sdfs: string = res.text();
            if (sdfs == 'error') {
              alert('Error ocurred');
            } else {

              this.navCtrl.push(ProfilePage);
            }

          }, error => {
            console.log("Oooops!");
          });


    }
  }


  selsportscls(id){
    var idx = this.selsports.indexOf(id);
    return ( idx > -1) ? 'activeimg' : '';
  }

    selsportsfunct(id){
        var idx = this.selsports.indexOf(id);

        if(idx == -1){
            this.selsports.push(id);
        }else{
            this.selsports.splice(idx,1);
        }

        var link = 'http://torqkd.com/user/ajs2/addDelsports';
        var data = { sportid: id, userid: this.loggedinuser };

        this._http.post(link, data)
            .subscribe(res => {

            }, error => {
                console.log("Oooops!");
            });


    }

    goblockpage(){
        let modal = this.modalCtrl.create(UserblockPage, {
        });

        modal.present();
    }

    changeprivacy(){
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Privay',
            cssClass : 'sharewithactionsheet',
            buttons: [
                {
                    text: 'public',
                    cssClass : (this.privacy == 1)?'activebtn':'',
                    handler: () => {
                        this.changesharewithfun(1);
                    }
                },{
                    text: 'Friends',
                    cssClass : (this.privacy == 2)?'activebtn':'',
                    handler: () => {
                        this.changesharewithfun(2);
                    }
                },{
                    text: 'Friends of Friends',
                    cssClass : (this.privacy == 3)?'activebtn':'',
                    handler: () => {
                        this.changesharewithfun(3);
                    }
                },{
                    text: 'private me only',
                    cssClass : (this.privacy == 4)?'activebtn':'',
                    handler: () => {
                        this.changesharewithfun(4);
                    }
                }
            ]
        });
        actionSheet.present();
    }

    changesharewithfun(pval){
        var link = 'http://torqkd.com/user/ajs2/updateuserprivacy';
        var data = { privacy : pval , user_id:this.loggedinuser};

        this._http.post(link, data)
            .subscribe(res => {
                this.privacy = pval;
            }, error => {
                console.log("Oooops!");
            });
    }

    addPhoto(type){
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Image',
            cssClass : 'photoSheet',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: () => {
                        this.opencamera(type);
                    }
                },{
                    text: 'Gallery',
                    icon: 'photos',
                    handler: () => {
                        this.openphotobowse(type);
                    }
                }
            ]
        });
        actionSheet.present();
    }

    opencamera(type){
        let options: CaptureImageOptions = { limit: 1 };
        MediaCapture.captureImage(options)
            .then(
                (data: MediaFile[]) => {
                    this.imagepath=data[0]['fullPath'];
                    if(type ==1)
                        this.filepath= 'images/fileloader.gif';
                    if(type ==2)
                        this.filepath1= 'images/fileloader.gif';
                    this.uploadpic2(type);
                },
                (err: CaptureError) => {
                }
            );
    }

    uploadpic2(type){

        const fileTransfer = new Transfer();
        var options: any;

        options = {
            fileKey: 'file',
            fileName: this.imagepath.toString().replace('file:/storage/emulated/0/Pictures/',''),
            headers: {}

        }
        //fileTransfer.upload(this.imagepath, "http://torqkd.com/user/ajs2/testfileupload", options)
        fileTransfer.upload(this.imagepath, "http://166.62.34.31:2/uploads", options)
            .then((data) => {
                // success

                var data1:any = JSON.parse(data.response);



                if(data1.error_code == 0){
                    if(type == 1)
                        var link = 'http://torqkd.com/user/ajs2/moveprofileimage';
                    if(type == 2)
                        var link = 'http://torqkd.com/user/ajs2/moveprofilebackimage';
                    var data5 = {file_name: data1.filename,userid:this.loggedinuser};



                    this._http.post(link, data5)
                        .subscribe(data11 => {
                            if(type == 1){
                                this.profimg_name = this.loggedinuser+'.jpg';
                                this.filepath = data11.text();
                            }
                            if(type == 2){
                                this.backimg_name = this.loggedinuser+'.jpg';
                                this.filepath1 = data11.text();
                            }
                        }, error => {
                            console.log("Oooops!");
                        });
                }else{
                    alert('error occured');
                }



            }, (err) => {
                // error
                alert(err);
                //this.statuscancel();
            })
    }
    openphotobowse(type){
        let options = {
            // max images to be selected, defaults to 15. If this is set to 1, upon
            // selection of a single image, the plugin will return it.
            maximumImagesCount: 80,

            // max width and height to allow the images to be.  Will keep aspect
            // ratio no matter what.  So if both are 800, the returned image
            // will be at most 800 pixels wide and 800 pixels tall.  If the width is
            // 800 and height 0 the image will be 800 pixels wide if the source
            // is at least that wide.
            width: 1000,
            height: 0,

            // quality of resized image, defaults to 100
            quality: 90
        };

        //noinspection TypeScriptUnresolvedFunction
        ImagePicker.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                this.imagepath=results[i];
                if(type ==1)
                    this.filepath= 'images/fileloader.gif';
                if(type ==2)
                    this.filepath1= 'images/fileloader.gif';

                this.uploadpic(type);
            }
        }, (err) => {

            alert(err);

        });
    }

    uploadpic(type){

        const fileTransfer = new Transfer();
        var options: any;

        options = {
            fileKey: 'file',
            //fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.demo866280/cache/',''),
            fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.torkq502502/cache/',''),
            headers: {}

        }
        //fileTransfer.upload(this.imagepath, "http://torqkd.com/user/ajs2/testfileupload", options)
        fileTransfer.upload(this.imagepath, "http://166.62.34.31:2/uploads", options)
            .then((data) => {
                // success

                var data1:any = JSON.parse(data.response);



                if(data1.error_code == 0){
                    if(type == 1)
                        var link = 'http://torqkd.com/user/ajs2/moveprofileimage';
                    if(type == 2)
                        var link = 'http://torqkd.com/user/ajs2/moveprofilebackimage';
                    var data5 = {file_name: data1.filename,userid:this.loggedinuser};



                    this._http.post(link, data5)
                        .subscribe(data11 => {
                            if(type == 1){
                                this.profimg_name = this.loggedinuser+'.jpg';
                                this.filepath = data11.text();
                            }
                            if(type == 2){
                                this.backimg_name = this.loggedinuser+'.jpg';
                                this.filepath1 = data11.text();
                            }
                        }, error => {
                            console.log("Oooops!");
                        });
                }else{
                    alert('error occured');
                }



            }, (err) => {
                // error
                alert(err);
                //this.statuscancel();
            })
    }

    imagedel(type){
        var link = 'http://torqkd.com/user/ajs2/profileImgDel';
        var data5 = {type: type,userid:this.loggedinuser};



        this._http.post(link, data5)
            .subscribe(data11 => {
                var res = data11.json();
                if(type == 1){
                    this.profimg_name = res.imgName;
                    this.filepath = res.imgSrc;
                }
                if(type == 2){
                    this.backimg_name = res.imgName;
                    this.filepath1 = res.imgSrc;
                }
            }, error => {
                console.log("Oooops!");
            });    }


}
