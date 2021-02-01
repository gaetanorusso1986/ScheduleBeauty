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
    this.loadingCtrl.present(); 
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
    

    this.error = null;
     this.user.recovery(details.email).then((result) => {
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlert("Ti è stata inviata una mail all'indirizzo associato alla tua utenza");
    
     // this.navCtrl.navigateRoot('/login');
    }).catch((err) => { 
      
      if (err.message != "") {
        this.loadingCtrl.dismiss();
        this.alertUtil.presentAlertError("Email non presente nei nostri sistemi");   
        
        //this.navCtrl.push(ConfirmPage, { 'username': details.username });
      }
      
    });
   
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
