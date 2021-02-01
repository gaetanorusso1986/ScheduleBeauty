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
  public userLogged:string;
  //public user:any;
  rootPage: any=LoginPage;

  public appPages = [{
    title: 'Prenota',
    url: '/home',
    icon: 'cut'
  }
  ,
  /*{
    title: 'Registrati',
    url: 'signup',
    icon: 'trash'
  },*/
  {
    title: 'Accedi',
    url: 'login',
    icon: 'person',
    role:["admin"]
  },
  {
    title: 'Le mie prenotazioni',
    url: './my-booking',
    icon: 'archive'
  }
 /* {
    title: 'Prenotazioni Ricevute',
    url: './reservations-received',
    icon: 'archive'
  },
  {
    title: 'Impostazioni',
    url: './settings',
    icon: 'archive'
  }*/
];
 
    
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public labels=[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public user:User,
    private nav: NavController,
    public loading: LoadingService,
    public navParams:NavParams,
    private event: Events ) {
      this.userLogged='';
    this.initializeApp();
  }

  initializeApp() {
    
    this.event.subscribe('user:created', (userEventData) => {
      
    this.user.user=userEventData;
    this.userLogged="";
if(this.user.user!=null){
  this.appPages=[{
    title: 'Prenota',
    url: '/home',
    icon: 'cut'
  }],
  this.userLogged=this.user.user.Firstname==null ? this.user.user.Username : this.user.user.Firstname ;
  
    if(this.user.user.Role.Name=="Utente")
    {
      this.appPages.push( 
      {
        title: 'Le mie prenotazioni',
        url: './my-booking',
        icon: 'calendar'
      })
    }
    else if( this.user.user.Role.Name=="Administrator") {
      this.appPages.push(    
        {
         title: 'Visualizza clienti',
         url: './customers',
         icon: 'calendar'
       },
         
        {
         title: 'Invita nuovi clienti',
         url: './invita-clienti',
         icon: 'add-circle'
       },
       )
    }
    else if( this.user.user.Role.Name=="Beauty") {
      this.appPages.push(    
       {
        title: 'Prenotazioni Ricevute',
        url: './reservations-received',
        icon: 'calendar'
      })
    }
  }
    else{
      this.appPages = [    
      {
        title: 'Accedi',
        url: 'login',
        icon: 'person',
        role:["admin"]
      },
      {
        title: 'Le mie prenotazioni',
        url: './my-booking',
        icon: 'calendar'
      }];
    }
    
    this.appPages.push(
    {
      title: 'Impostazioni',
      url: './settings',
      icon: 'settings'
    })
  
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
