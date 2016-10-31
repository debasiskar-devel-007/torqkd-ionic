import { Component } from '@angular/core';
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform,ActionSheetController} from "ionic-angular";
import {Http, Headers} from "@angular/http";
import {DomSanitizationService} from "@angular/platform-browser";
import {VideodetPage} from "../videodet/videodet";
import {AlbumPage} from "../album/album";
import {ProfilePage} from "../profile/profile";
import * as $ from "jquery";
import {CommonPopupPage} from "../commonpopup/commonpopup";
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

import {ImagePicker, CaptureImageOptions, MediaFile, CaptureError, CaptureVideoOptions,MediaCapture,ScreenOrientation, Transfer,Camera,StreamingMedia, StreamingVideoOptions} from 'ionic-native';

/*
  Generated class for the AlbumvideoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/albumvideo/albumvideo.html',
})
export class AlbumvideoPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;
  private loggedinuser;
  private local:LocalStorage;
  private videolist;
  public albumpage = AlbumPage;
  public profilepage = ProfilePage;
  private userImage;


  public isStatusInput = false;
  public statusText = '';
  public share_with = 1;
  public filepath;
  public imagepath;
  public statusvalue;
  public videopath;


  constructor(private navCtrl: NavController,private _http: Http, private sanitizer:DomSanitizationService,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController) {
    this.userImage = 'http://torqkd.com/uploads/user_image/thumb/default.jpg';
    
    this.local = new Storage(LocalStorage);

    this.local.get('userinfo').then((value) => {
      this.loggedinuser=JSON.parse(value).id;
      console.log(JSON.parse(value).id);
      if(value!=null) {
        this.getvideos(this.loggedinuser,this.loggedinuser);
        this.userImage = JSON.parse(value).user_image;
      }
      else{
        $('ion-content').removeClass('hide');
        this.getvideos(0,60);
      }
    });
  }

  openmenu(){
    $('.navmenul').click();
  }
  getvideos(loggedinuser,userid){
    var link = 'http://torqkd.com/user/ajs2/getVideo';
    var data = {userid:userid,sess_id : loggedinuser};



    this._http.post(link, data)
        .subscribe(res => {
          this.videolist = res.json();
        }, error => {
          console.log("Oooops!");
        });

  }

  getsanitizerstyle(imgsrc){
    return this.sanitizer.bypassSecurityTrustStyle('url(' + imgsrc + ')');
  }

  showPhotoDetails(item){
    let modal = this.modalCtrl.create(VideodetPage, {
      "item": item,
    });

    modal.present();

  }

  showtermsploicy(type){
    let modal = this.modalCtrl.create(CommonPopupPage, {
      "type": type
    });

    modal.present();
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

  changestatustext(keyval){
    this.statusText = keyval;
  }

  changesharewith(ev){
    this.share_with = ev;
  }

  addVideo(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload Video',
      cssClass : 'photoSheet',
      buttons: [
        {
          text: 'Camera',
          icon: 'videocam',
          handler: () => {
            this.opencameraforvideo();
          }
        },{
          text: 'Gallery',
          icon: 'film',
          handler: () => {
            this.openvideobowse();
          }
        }
      ]
    });
    actionSheet.present();
  }

  opencameraforvideo(){

    let options: CaptureVideoOptions = { limit: 1 };
    MediaCapture.captureVideo(options)
        .then(
            (data: MediaFile[]) => {

              this.videopath = data[0]['fullPath'];
              this.isStatusInput = true;

              this.uploadvideo();

            },
            (err: CaptureError) => {
              alert(err)



            }
        );
  }


  uploadvideo(){


    const fileTransfer = new Transfer();
    var options: any;

    options = {
      fileKey: 'file',
      //fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.demo866280/cache/',''),
      fileName: this.videopath.toString().replace('file:/storage/emulated/0/DCIM/Camera/',''),
      headers: {}

    }
    //fileTransfer.upload(this.imagepath, "http://torqkd.com/user/ajs2/testfileupload", options)
    fileTransfer.upload(this.videopath, "http://166.62.34.31:2/uploads", options)
        .then((data) => {
          // success

          var data1:any = JSON.parse(data.response);


          if(data1.error_code == 0){
            this.statusvalue = data1.filename;
            var link = 'http://torqkd.com/user/ajs2/movevdofile';
            var data5 = {file_name: data1.filename,folder_name : 'video/converted'};



            this._http.post(link, data5)
                .subscribe(data11 => {
                  console.log("Oooops!");
                }, error => {
                  console.log("Oooops!");
                });



          }else{
            alert('error occured');
          }



        }, (err) => {
          // error
          alert(JSON.stringify(err));
          //this.statuscancel();
        })
  }


  openvideobowse(){
    var options = {
      quality: 50,
      //destinationType: Camera.FILE_URI,
      sourceType: 0,
      mediaType:1
    };

    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.videopath = imageData;
      this.isStatusInput = true;



    }, (err) => {
      alert(JSON.stringify(err));
    });
  }

  uploadvideo1(status_id){

    const fileTransfer = new Transfer();
    var options: any;

    options = {
      fileKey: 'file',
      //fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.demo866280/cache/',''),
      fileName: this.videopath.toString().replace('/storage/emulated/0/DCIM/Camera/',''),
      headers: {}

    }
    //fileTransfer.upload(this.imagepath, "http://torqkd.com/user/ajs2/testfileupload", options)
    fileTransfer.upload(this.videopath, "http://166.62.34.31:2/uploads", options)
        .then((data) => {
          // success

          var data1:any = JSON.parse(data.response);


          if(data1.error_code == 0){
            this.statusvalue = data1.filename;
            var link = 'http://torqkd.com/user/ajs2/movevdofile';
            var data5 = {file_name: data1.filename, folder_name : 'video/converted'};

            this._http.post(link, data5)
                .subscribe(data11 => {
                  console.log("Oooops!");
                }, error => {
                  console.log("Oooops!");
                });

                 }else{
            alert('error occured');
          }



        }, (err) => {
          // error
          alert(JSON.stringify(err));
          //this.statuscancel();
        })
  }

  postcancel(){
    this.isStatusInput = false;
    this. statusText = '';
    this.share_with = 1;
    this.filepath='';
    this.imagepath='';
    this.videopath='';
    this.statusvalue='';
  }

  postStatus(){
    var link = 'http://torqkd.com/user/ajs2/addAlbum';
    var data = {'value':this.statusvalue,'user_id':this.loggedinuser,'share_with':this.share_with,'type':'video','msg':this.statusvalue};

    this._http.post(link, data)
        .subscribe(data => {
      //    this.photolist.splice(0, 0,data.json());

          this.isStatusInput = false;
          this. statusText = '';
          this.share_with = 1;
          this.filepath='';
          this.imagepath='';
          this.videopath='';
          this.statusvalue='';

        }, error => {
          console.log("Oooops!");
        });
  }



}
