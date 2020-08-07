import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import { NavController } from '@ionic/angular';
import {LoadingService} from '../LoadingService';
import {Events} from '../../service/Events'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  singleuser:any;
  constructor(public user: User,public navCtrl:NavController,
    public loadingCtrl:LoadingService,private event: Events) { }

  ngOnInit() {
    this.singleuser=this.user.user;
    console.log(this.singleuser);
  }

  logout() {
    this.loadingCtrl.present();
    this.user.logout();   

    if(this.user.user ==null)
    {
      this.event.publish('user:created',null);
      
      this.loadingCtrl.dismiss();
      this.navCtrl.navigateRoot("/login");

    }
    //this.app.getRootNav().setRoot(LoginPage);
  }


  myprofile(){
this.navCtrl.navigateRoot("/profile");

  }
  mysocial(user){

    this.navCtrl.navigateRoot("/social");
  }
  myservice(user){


  }


}
