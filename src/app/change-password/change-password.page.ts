import { Component, OnInit } from '@angular/core';
import { User } from 'src/providers/user';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertUtil } from '../alertUtil';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class UserDetails {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;    
}
export class ChangePasswordPage implements OnInit {
  public userDetails: UserDetails;
  
  constructor(public navCtrl: NavController,
    public user: User,
    public loadingCtrl: LoadingController, private alertUtil: AlertUtil) { }

  ngOnInit() {
    alert("ciao");
  }

  changePassword() {
    /*let details = this.userDetails;

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
   /* let loading = this.loadingCtrl.create({
      content: 'Attendere prego...'
    });
    
   // loading.present();

    
    console.log('change Password');
    this.user.changePassword(details.oldPassword, details.newPassword).then((result) => {      
      console.log('result:', result);
      this.alertUtil.presentAlert("Password modificata con successo. Effettua il login");
     // loading.dismiss();
      this.navCtrl.navigateRoot("/login");
    }).catch((err) => {       
      if (err.message != "") {
          {
            console.log('error', err.message);
            this.alertUtil.presentAlertError(err.message);
          //  loading.dismiss();
          }
      }      
    });*/
  }

}
