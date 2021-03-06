import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpModule} from '@angular/http';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {User} from '../providers/user';
import {Beauty} from '../providers/beauty';
import {Availability} from  '../providers/Availability';
import {Reservations} from  '../providers/Reservations';
import {Holidays} from '../providers/Holidays';
import {Social} from  '../providers/Social';
import {Service} from  '../providers/Service';
import {Operators} from  '../providers/Operators';
import { Device } from '@ionic-native/device/ngx'
import { AlertUtil} from '../app/alertUtil';
import {LoadingService} from '../app/LoadingService';
import { MybeautyPage } from '../app/mybeauty/mybeauty.page';
import { SocialPage } from '../app/social/social.page';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
registerLocaleData(localeIt);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    SocialPage,
    
    MybeautyPage,
    Location,
    StatusBar,
    NavParams,
    SplashScreen,
    Device,
    AlertUtil,
    LoadingService,
    User,
    Availability,
    Reservations,
    Beauty,
    Service,
    Social,
    Operators,
    Holidays,
    NativeStorage,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: "it-IT" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
