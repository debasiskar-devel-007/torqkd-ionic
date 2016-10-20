import {Component, ViewChild} from "@angular/core";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Splashscreen, InAppBrowser, ImagePicker} from "ionic-native";
import {Http, Headers} from "@angular/http";
import {Storage, LocalStorage, NavController, Nav, Content, ModalController, Platform} from "ionic-angular";
import * as $ from "jquery";
import {HomePage} from "../home/home";
import {HomevideomodalPage} from "../homevideomodal/homevideomodal";
import {SocialcommentPage} from "../socialcomment/socialcomment";
import {ProfilePage} from "../profile/profile";
import {profileeventlistPage} from "../profileeventlist/profileeventlist";
import {profilegroupPage} from "../profilegroup/profilegroup";
import {tagpeoplelistPage} from "../tagpeoplelist/tagpeoplelist";
import {socialtaglistPage} from "../socialtaglist/socialtaglist";
import {statDetPage} from "../statdet/statdet";
import {DomSanitizationService} from "@angular/platform-browser";
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import '../../../node_modules/chart.js/src/chart.js';
import { BaseChartComponent } from 'ng2-charts/ng2-charts';
import {CommonPopupPage} from "../commonpopup/commonpopup";

//import {ProfilePage} from '../profile/profile'
//import * as $ from "jquery";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/profilestat/profilestat.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES,BaseChartComponent]
})
export class profileStatPage {
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
    sanitizer;
    public profilepage=ProfilePage;
    public profileeventlistpage=profileeventlistPage;
    public profilegrouppage=profilegroupPage;
    public isStatusInput = false;
    public statustype = '';
    public statusvalue = '';
    public tagpeople = '';
    public getExactRunning = false;
    public statusText1 = '';
    public groupList;
    public groupcount;
    public statdata2;
    public statcount;


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

    constructor(fb: FormBuilder,public platform: Platform,public navCtrl: NavController,private _http: Http ,public modalCtrl: ModalController ,sanitizer:DomSanitizationService ,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController) {
        this.sanitizer=sanitizer;



        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });


        platform.registerBackButtonAction(() => {

            this.navCtrl.pop();

        });

        var link = 'http://torqkd.com/user/ajs2/getProfilebanners';
        var data = {pageid: 3,sp_id:0};



        this._http.post(link, data)
            .subscribe(data => {
                if(data.json()==null){

                    return;
                }
                else{

                    this.banner1data=data.json().banner1;
                    this.banner2data=data.json().banner2;

                }
            }, error => {
                console.log("Oooops!");
            });


        this.local = new Storage(LocalStorage);

        this.local.get('userinfo').then((value) => {
            this.loggedinuser=JSON.parse(value).id;
            console.log(JSON.parse(value).id);
            if(value!=null) {

                this.isloggedin=true;


                /************statdata[start]*********************/
                var link1 = 'http://torqkd.com/user/ajs2/getonlystat/userid/'+this.loggedinuser;
                var data1 = {};

                this._http.post(link1, data1)
                    .subscribe(data => {
                        if(data.json()==null){

                            return;
                        }
                        else{
                            this.statdata=data.json().statdet;
                        }
                    }, error => {
                        console.log("Oooops!");
                    });
                /************statdata[end]*********************/

                /*****************Get User Stat[start]**********************/
                var link5 = 'http://torqkd.com/user/ajs2/getUserStat';
                var data5 = {userid: this.loggedinuser};

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
            else{
                $('ion-content').removeClass('hide');
                this.isloggedin=false;
            }
        });

        this.local = new Storage(LocalStorage);

        this.local.get('userinfo').then((value) => {

            if(value!=null) {

                this.isloggedin=true;
                $('.has-header').removeClass('hide');

            }
            else{

                this.isloggedin=false;
            }
        });
    }


    launch(url){
/*
        let browser = new InAppBrowser();
        InAppBrowser.open(url, "_system", "location=true");
*/    }

    openmenu(){
        $('.navmenul').click();
    }


    onPageScroll(event) {
        if($('ion-header').height() < event.target.scrollTop) {


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

    openphotobowse(){

        $('.status-input').removeClass('hide');
        $('.browsephoto').removeClass('hide');

        let options = {
            // max images to be selected, defaults to 15. If this is set to 1, upon
            // selection of a single image, the plugin will return it.
            maximumImagesCount: 80,

            // max width and height to allow the images to be.  Will keep aspect
            // ratio no matter what.  So if both are 800, the returned image
            // will be at most 800 pixels wide and 800 pixels tall.  If the width is
            // 800 and height 0 the image will be 800 pixels wide if the source
            // is at least that wide.
            width: 200,
            height: 200,

            // quality of resized image, defaults to 100
            quality: 90
        };
        ImagePicker.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                alert('Image URI: ' + results[i]);
                $('.photopreview').attr('src',results[i]);
            }
        }, (err) => { });
    }


    changesharewithhtml(item) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Who should see this?',
            cssClass : 'sharewithactionsheet',
            buttons: [
                {
                    text: 'Community',
                    cssClass : (item.share_with==1)?'activebtn':'',
                    handler: () => {
                        this.changesharewithfun(item,1);
                    }
                },{
                    text: 'Friends',
                    cssClass : (item.share_with==2)?'activebtn':'',
                    handler: () => {
                        this.changesharewithfun(item,2);
                    }
                },{
                    text: 'Friends of Friends',
                    cssClass : (item.share_with==3)?'activebtn':'',
                    handler: () => {
                        this.changesharewithfun(item,3);
                    }
                },{
                    text: 'private me only',
                    cssClass : (item.share_with==4)?'activebtn':'',
                    handler: () => {
                        this.changesharewithfun(item,4);
                    }
                }
            ]
        });
        actionSheet.present();
    }

    changesharewithfun(item,valu){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var link = 'http://torqkd.com/user/ajs2/changeShareWith';
        var data = {status_id: item.id,valu:valu};


        this._http.post(link, data)
            .subscribe(data => {
                item.share_with = valu;
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

    texthighlight(event){
        var highheight = 58;
        if(document.getElementById("statusuparea").scrollHeight > highheight)
            highheight = document.getElementById("statusuparea").scrollHeight;

        $('.highlightTextarea').css('height',highheight);
        $('.highlightTextarea-container').css('height',highheight);
        $('.highlightTextarea-highlighter').css('height',highheight);


        var strss = $('#statusuparea').text();

        var re = /(?:^|\W)#(\w+)(?!\w)/g, match, matches ;

        while (match = re.exec(strss)) {

            var hastag = '#'+match[1];

            $('#text-box').find('.highlightTextarea-highlighter').html($('#statusuparea').text().replace(hastag,'<span style="color:#fff;background-color:#F7931D; z-index: 9; position: relative;">'+hastag+'</span>'));
        }

        var match_url = /\b(https?):\/\/([\-A-Z0-9.]+)(\/[\-A-Z0-9+&@#\/%=~_|!:,.;]*)?(\?[A-Z0-9+&@#\/%=~_|!:,.;]*)?/i;

        if(match_url.test(strss) && (event.keyCode == 13 || event.keyCode == 32) && !this.getExactRunning){
            this.getExactRunning = true;
            var extracted_url = strss.match(match_url)[0];
            console.log(extracted_url);
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            var link = 'http://torqkd.com/user/ajs2/extratcUrl';
            var data5 = {url: extracted_url};

            this._http.post(link, data5)
                .subscribe(data1 => {
                    this.getExactRunning = false;

                    var data = data1.json();

                    var total_images = parseInt(data.images.length)-1;
                    var img_arr_pos = 0;

                    if(data.title != '' && data.title != null){


                        var content = '';
                        var content1 = '';

                        content += '<div class="extracted_url">';
                        content1 += '<div class="extracted_url extracted_url2">';

                        if(data.images.length > 0){
                            content += '<div class="extracted_thumb" id="extracted_thumb">';
                            content += '<a href="javascript:void(0)"  id="extracted_close1" class="extracted_close1"><img src="images/close-img.png" /></a>';
                            content += '<img src="'+data.images[img_arr_pos]+'"></div>';
                            content1 += '<div class="extracted_thumb"><img src="'+data.images[img_arr_pos]+'"></div>';
                            if(data.images.length > 1) {
                                content += '<div class="thumb_sel"><span class="prev_thumb" id="thumb_prev">prev</span><span class="next_thumb" id="thumb_next">next</span> </div>';
                            }
                        }
                        content += '<div class="extracted_content">';
                        content += '<a href="javascript:void(0)"  id="extracted_close2" class="extracted_close2"><img src="images/close-img.png" /></a>';
                        content += '<h4><a href="'+extracted_url+'" target="_blank">'+data.title+'</a></h4>';
                        content1 += '<div class="extracted_content"><h4><a href="'+extracted_url+'" target="_blank">'+data.title+'</a></h4>';
                        content += '<p>'+data.description+'</p>';
                        content1 += '<p>'+data.description+'</p>';
                        content += '<div class="clear"></div></div>';
                        content1 += '<div class="clear"></div></div>';
                        content += '<div class="clear"></div></div>';
                        content1 += '<div class="clear"></div></div>';


                        $( '#extracted_url' ).html(content);

                        this.statusText1 = content1;
                    }
                    $("#thumb_prev").click( function(e){
                        if(img_arr_pos>0)
                        {
                            img_arr_pos--;
                            $("#extracted_thumb").html('<a href="javascript:void(0)"  id="extracted_close1" class="extracted_close1"><img src="images/close-img.png" /></a><img src="'+data.images[img_arr_pos]+'">');
                        }

                        this.statusText1 = '<div class="extracted_url"><div class="extracted_thumb"><img src="'+data.images[img_arr_pos]+'"></div><div class="extracted_content"><h4><a href="'+extracted_url+'" target="_blank">'+data.title+'</a></h4><p>'+data.description+'</p><div class="clear"></div></div><div class="clear"></div></div>';
                    });
                    $("#thumb_next").click( function(e){
                        if(img_arr_pos<total_images)
                        {
                            img_arr_pos++; //thmubnail array position increment
                            $("#extracted_thumb").html('<a href="javascript:void(0)"  id="extracted_close1" class="extracted_close1"><img src="images/close-img.png" /></a><img src="'+data.images[img_arr_pos]+'">');
                        }

                        this.statusText1 = '<div class="extracted_url"><div class="extracted_thumb"><img src="'+data.images[img_arr_pos]+'"></div><div class="extracted_content"><h4><a href="'+extracted_url+'" target="_blank">'+data.title+'</a></h4><p>'+data.description+'</p><div class="clear"></div></div><div class="clear"></div></div>';
                    });

                    $('#extracted_close1').click(function(){
                        $( '#extracted_thumb' ).remove();
                        $( '.thumb_sel' ).remove();
                        this.statusText1 = '<div class="extracted_url"><div class="extracted_content"><h4><a href="'+extracted_url+'" target="_blank">'+data.title+'</a></h4><p>'+data.description+'</p><div class="clear"></div></div><div class="clear"></div></div>';
                    });

                    $('#extracted_close2').click(function(){
                        $( '#extracted_url' ).html('');
                        this.statusText1 = '';
                    });

                }, error => {
                    this.getExactRunning = false;
                });
        }

    }

    showtagPeople(){
        let modal = this.modalCtrl.create(tagpeoplelistPage, {
            "item": this.tagpeople,
        });

        modal.present();

    }

    showtagPeople1(item){
        let modal = this.modalCtrl.create(socialtaglistPage, {
            "item": item.tagpeople,
        });

        modal.present();

    }
    statuscancel(){
        $('#text-box').find('.highlightTextarea-highlighter').html('');
        $('.highlightTextarea').css('height',58);
        $('.highlightTextarea-container').css('height',58);
        $('.highlightTextarea-highlighter').css('height',58);
        this.isStatusInput = false;

        $('#statusuparea').text('');
        $( '#extracted_url' ).html('');

        this.statusText1 = '';
        this.statustype = '';
        this.statusvalue = '';
        this.tagpeople = '';
    }

    statusupdate(){
        var msg = $('#statusuparea').text();

        alert(msg);

        if(msg != '' || this.statusvalue !=''){

            this.local = new Storage(LocalStorage);

            this.local.get('tagpeoplelist').then((value) => {
                this.tagpeople = value;

                var msg1 = this.statusText1;
                var share_with = $('#share_with').val();
                var group_id = 0;


                var headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
                var link = 'http://torqkd.com/user/ajs2/statusUpdate';
                var data = {'msg':msg,'msg1':msg1,'share_with':$('#share_with').val(),'group_id':group_id,'type':this.statustype,'value':this.statusvalue,'is_status':1,'status_id':0,tagpeople:this.tagpeople,'sess_user':this.loggedinuser};

                this._http.post(link, data)
                    .subscribe(data => {
                        this.statusdata.splice(0, 0,data.json());

                        $('#text-box').find('.highlightTextarea-highlighter').html('');
                        $('.highlightTextarea').css('height',58);
                        $('.highlightTextarea-container').css('height',58);
                        $('.highlightTextarea-highlighter').css('height',58);
                        this.isStatusInput = false;

                        $('#statusuparea').text('');
                        $( '#extracted_url' ).html('');

                        this.statusText1 = '';
                        this.statustype = '';
                        this.statusvalue = '';
                        this.tagpeople = '';



                    }, error => {
                        console.log("Oooops!");
                    });
            });

            this.local = new Storage(LocalStorage);
            this.local.remove('tagpeoplelist');
        }else{
            alert("Please write status or upload video/imnage");
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

    showtermsploicy(type){
        let modal = this.modalCtrl.create(CommonPopupPage, {
            "type": type
        });

        modal.present();
    }


}



