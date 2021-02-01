import { Component, OnInit } from '@angular/core';
import {User} from '../../providers/user';
import { ModalController, NavController } from '@ionic/angular';

import { MyprofilePage } from '../myprofile/myprofile.page';
import { LoadingService } from '../LoadingService';
import { AlertUtil } from '../alertUtil';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile:any;
  constructor(private user:User,
    public modalCtrl: ModalController,
    public navCtrl:NavController,private alertUtil: AlertUtil,public loadingCtrl:LoadingService) { }

  ngOnInit() {
    this.profile=this.user.getUser();
    
  }

  update(){
    
    this.loadingCtrl.present();
    if(this.profile.Email=="" || this.profile.Username==""){
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlertError("Inserire tutte le informazioni");    
      return false;

    }

  this.user.updateUser(this.profile).then((result) => {
    this.loadingCtrl.dismiss();
    this.alertUtil.presentAlert("Aggiornamento avvenuto correttamente !");
  }).catch((err)=>{
    this.loadingCtrl.dismiss();
    var errore = JSON.parse(JSON.stringify( err));
    console.log(errore.ExceptionMessage);
    this.alertUtil.presentAlertError(errore.Message);
    
  });
 
  }
  backPage(){    
    this.navCtrl.navigateRoot("settings"); 
    }
  ChangePassword(){
    this.navCtrl.navigateRoot("changepassword");
      
  }
  
  async EditProfile(profile){
    const modal = await this.modalCtrl.create({
      component: MyprofilePage,
      componentProps: { value: profile }      
    });
    return await modal.present();  
  }

}
