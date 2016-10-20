import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {HomePage} from './pages/home/home';
import {ProfilePage} from './pages/profile/profile';
import {NotificationPage} from './pages/notification/notification';
import {FriendsPage} from './pages/friends/friends';
import {AlbumPage} from './pages/album/album';
import {CommunityPage} from './pages/community/community';
import {TorqkdtvPage} from './pages/torqkdtv/torqkdtv';
import {ViewroutesPage} from './pages/viewroutes/viewroutes';
import {AddeventsPage} from './pages/addevents/addevents';
import {AddgroupsPage} from './pages/addgroups/addgroups';
import {AddroutesPage} from './pages/addroutes/addroutes';
import {ForumPage} from './pages/forum/forum';
import {DailypollPage} from './pages/dailypoll/dailypoll';
import {EventmapPage} from './pages/eventmap/eventmap';
import {MysportsPage} from './pages/mysports/mysports';
import {UpdateprofilePage} from './pages/updateprofile/updateprofile';
import {SportsPage} from './pages/sports/sports';
import {ExperiencePage} from './pages/experience/experience';
import {LogoutPage} from './pages/logout/logout';
import {PhotoPage} from './pages/photo/photo';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = ProfilePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Notifications', component: NotificationPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Friends', component: FriendsPage },
      { title: 'Community', component: CommunityPage },
      { title: 'Album', component: AlbumPage },
      { title: 'Photo', component: PhotoPage },
      { title: 'Torkq TV', component: TorqkdtvPage },
      { title: 'View Routes', component: ViewroutesPage },
      { title: 'Add Events', component: AddeventsPage },
      { title: 'Add Groups', component: AddgroupsPage },
      { title: 'Add Routes', component: AddgroupsPage },
      { title: 'Forum', component: ForumPage },
      { title: 'Daily Poll', component: DailypollPage },
      { title: 'Event Map', component: EventmapPage },
      { title: 'My Sports', component: MysportsPage },
      { title: 'Update Profile', component: UpdateprofilePage },
      { title: 'Sports', component: SportsPage },
      { title: 'Experience', component: ExperiencePage },
      { title: 'Logout', component: LogoutPage },

    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (Splashscreen) {
        setTimeout(() => {
          Splashscreen.hide();
        }, 100);
      }

      if (StatusBar) {
        // hide StatusBar using cordova-plugin-statusbar
        setTimeout(() => {
          StatusBar.backgroundColorByHexString("#B2B2B2")
        },100);
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
