
import { Component, OnInit, Injectable } from '@angular/core';
import {User} from '../../providers/user';
import { LoadingService } from '../LoadingService';
import { AlertUtil } from '../alertUtil';
import { NavController } from '@ionic/angular';

export class UserDetails {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;    
}

@Injectable()
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})


export class ChangepasswordPage implements OnInit {

  public userDetails: UserDetails;
  constructor( public loadingCtrl:LoadingService,public user:User,
    private alertUtil: AlertUtil,public navCtrl: NavController) { 
       this.userDetails= new UserDetails();
  }

  ngOnInit() {
  }
  backPage()
  {

    this.navCtrl.navigateBack("/settings");

  }
  UpdatePassword() {
    let details = this.userDetails;

    if(!details.hasOwnProperty("oldPassword") && !details.hasOwnProperty("newPassword") 
    && !details.hasOwnProperty("confirmPassword")) {
      return false;
    }

    if(!details.hasOwnProperty("oldPassword")) {
      this.alertUtil.presentAlertError("Inserire la vecchia password");      
      return false;
    }
    if(!details.hasOwnProperty("newPassword")) {
      this.alertUtil.presentAlertError("Inserire la nuova password");      
      return false;
    }
    if(!details.hasOwnProperty("confirmPassword")) {
      this.alertUtil.presentAlertError("Inserire la conferma della password");      
      return false;
    }
    if(details.newPassword != details.confirmPassword) {
      this.alertUtil.presentAlertError("Password e Conferma Password devono coincidere.");
      
      return false;
    }
   let loading =  this.loadingCtrl;
    
  loading.present();

    
    
    this.user.changePassword(details.oldPassword, details.newPassword).then((result) => {      
      
      this.alertUtil.presentAlert("Password modificata con successo. Effettua il login");
      loading.dismiss();
      this.navCtrl.navigateRoot("/login");
    }).catch((err) => {  
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
      this.alertUtil.presentAlertError(errore._body);
      this.loadingCtrl.dismiss();    
         
    });
  }

}
