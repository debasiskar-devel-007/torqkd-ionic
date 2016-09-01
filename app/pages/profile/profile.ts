import {Component, ViewChild} from '@angular/core';
import {NavController, Page, App, Platform, MenuController, Nav} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {ContactPage} from '../contact/contact'
import {LoginPage} from '../login/login'
import {AboutPage} from '../about/about'

/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  @ViewChild(Nav) nav: Nav;

  static get parameters() {
    return [
      [Platform],
      [MenuController]
    ];
  }

  //private nav;
  private platform;
  private menu;
  private pages;
  constructor(platform:Platform,menu:MenuController) {
    //this.nav = nav;

    this.platform = platform;
    this.menu = menu;
    //this.initializeApp();

    // the side menu links and their destinations
    // In english, Each page will display the title of the page
    // and link to what ionic page, specified under the component.
    // it'll make more sense in template soon.
    this.pages = [
      { title: 'ContactPage Page', component: ContactPage },
      { title: 'My LoginPage', component: LoginPage },
      { title: 'AboutPage', component: AboutPage }
    ];

  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}
