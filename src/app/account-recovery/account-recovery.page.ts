import { Component, OnInit } from '@angular/core';


import { NavController, LoadingController,ModalController  } from '@ionic/angular';
import { AlertUtil } from '../../app/alertUtil';
import {LoadingService} from '../LoadingService';
import { User } from '../../providers/user';
import { async } from '@angular/core/testing';

export class UserDetails {    
  email: string;
}

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.page.html',
  styleUrls: ['./account-recovery.page.scss'],
})
export class AccountRecoveryPage implements OnInit {

  public userDetails: UserDetails;
  error: any;

  constructor(public navCtrl: NavController,
              public user: User,              
              public loadingCtrl: LoadingService,public modal:ModalController, private alertUtil: AlertUtil) {
   this.userDetails = new UserDetails();
              }


  ngOnInit() {
  }
   recovery() {
     
    let details = this.userDetails;
    if(!details.hasOwnProperty("email")) {
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlertError("Inserire un'email"); 
      return false;
    }
    if(!this.checkMail(details.email))
    {    
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlertError("Email non corretta"); 
       return false;
  
    }
    this.loadingCtrl.present();

    this.error = null;
    console.log('register');
    this.user.recovery(details.email).then((result) => {
      console.log('result:', result);
      this.alertUtil.presentAlert("Ti è stata inviata una mail all'indirizzo associato alla tua utenza");
      this.loadingCtrl.dismiss();
      this.navCtrl.navigateRoot('/login');
    }).catch((err) => { 
      if (err.message != "") {
        //loading.dismiss();
        this.alertUtil.presentAlertError(err.message);
        console.log('error', err);
        
        //this.navCtrl.push(ConfirmPage, { 'username': details.username });
      }
      
    });
    this.loadingCtrl.dismiss();
  }

  back() {
    //this.navCtrl.push(LoginPage);
    this.modal.dismiss();
  }

  
  checkMail(email){    
    var check = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
    return check.test(email);
  }

}
