import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {UpdateprofilePage} from '../updateprofile/updateprofile';

/*
  Generated class for the SportsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/sports/sports.html',
})
export class SportsPage {
  public homepage = HomePage;
  public updateprofilepage = UpdateprofilePage;

  constructor(private navCtrl: NavController) {

  }

}
