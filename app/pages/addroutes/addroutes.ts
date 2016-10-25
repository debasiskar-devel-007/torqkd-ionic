import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

/*
  Generated class for the AddroutesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/addroutes/addroutes.html',
})
export class AddroutesPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;

  constructor(private navCtrl: NavController) {

  }

}
