import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/providers/user';
import { AlertUtil } from '../alertUtil';
import { LoadingService } from '../LoadingService';

@Component({
  selector: 'app-invita-clienti',
  templateUrl: './invita-clienti.page.html',
  styleUrls: ['./invita-clienti.page.scss'],
})
export class InvitaClientiPage implements OnInit {
public email:string;
  constructor(public user:User, public modalCtrl: ModalController,public loadingCtrl:LoadingService, private alertUtil: AlertUtil) { }

  ngOnInit() {
  }
  Invita()
  {
    this.loadingCtrl.present();
    debugger
    if(!this.checkMail(this.email))
    {    
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlertError("Email non corretta"); 
       return false;  
    }
    this.user.InvitaCliente(this.email).then((result)=>{
      
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlert("Invito avvenuto correttamente");
      this.email="";
    }).catch((err)=>{
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlertError("Invito non riuscito, riprova più tardi");
    });


  }
  checkMail(email){    
    var check = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
    return check.test(email);
  }

}
