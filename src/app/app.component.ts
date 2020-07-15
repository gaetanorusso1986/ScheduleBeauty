import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//#region [Pages] 
import {LoginPage} from '../app/login/login.page';
//#endregion

//#region [Providers]
import {User} from '../providers/user';
import {LoadingService} from '../app/LoadingService';
//#endregion

// //#region [Service]
import {Events} from '../service/Events'
//#region 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {  

  private router : Router;
  public selectedIndex = 0;
  //public user:any;
  rootPage: any=LoginPage;

  public appPages = [{
    title: 'Home',
    url: '/home',
    icon: 'archive'
  },
  {
    title: 'Registrati',
    url: 'signup',
    icon: 'trash'
  },
  {
    title: 'Accedi',
    url: 'login',
    icon: 'archive',
    role:["admin"]
  },
  {
    title: 'Le mie prenotazioni',
    url: './my-booking',
    icon: 'archive'
  }
];
 
    
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public user:User,
    private nav: NavController,
    public loading: LoadingService,
    public navParams:NavParams,
    private event: Events ) {
    this.initializeApp();
  }

  initializeApp() {
    this.event.subscribe('user:created', (userEventData) => {
      debugger;
    this.user.user=userEventData;

    if(this.user.user.Role.Name=="Customer")
    {
      this.appPages=[{
        title: 'Home',
        url: '/home',
        icon: 'archive'
      },      
      {
        title: 'Le mie prenotazioni',
        url: './my-booking',
        icon: 'archive'
      }
    ];
    }
    else if(this.user.user.Role.Name=="Beauty") {
      this.appPages=[{
        title: 'Home',
        url: '/home',
        icon: 'archive'
      },         
      {
        title: 'Le mie prenotazioni',
        url: './my-booking',
        icon: 'archive'
      },
      {
        title: 'La tua beauty',
        url: './my-booking',
        icon: 'archive'
      }
    ];

    }
    

    });
    this.loading.present();
    this.statusBar.styleDefault();
    this.platform.ready().then(() => {
      
      this.user.isAuthenticated().then(()=>{
        
        this.nav.navigateRoot("/signup");
        
      }).catch(()=>{
        
        this.nav.navigateRoot("/home");
      });
      
      this.splashScreen.hide();
      this.loading.dismiss();
    });
  }

  ngOnInit() {
    

    
   const path = window.location.pathname.split('folder/')[1];
   if (path !== undefined) {
      
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
