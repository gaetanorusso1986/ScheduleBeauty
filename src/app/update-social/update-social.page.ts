import { Component, OnInit, Input } from '@angular/core';
import { SocialPage } from '../social/social.page';
import {Social} from '../../providers/Social';
import { AlertUtil } from '../alertUtil';
import { LoadingService } from '../LoadingService';
import { ModalController } from '@ionic/angular';

export class Socials {
  Id: string;  
  Description: string;
  Name: string;    
  Fk_beauty :string;
}
@Component({
  selector: 'app-update-social',
  templateUrl: './update-social.page.html',
  styleUrls: ['./update-social.page.scss'],
})
export class UpdateSocialPage implements OnInit {
  @Input("value") value;
  public social:Socials;
  constructor(public soc:Social,public modal: ModalController,public loadingCtrl:LoadingService, private alertUtil: AlertUtil) { }

  ngOnInit() {
    this.social= new Socials();
    
    this.social=this.value;
  }
  Update(social)
  {
  
    this.loadingCtrl.present();
    this.soc.updateSocial(social).then((res)=>{
     this.alertUtil.presentAlert("Aggiornamenti avvenuto con successo")
     this.loadingCtrl.dismiss();
     this.modal.dismiss();

    }).catch((err)=>{
      if (err.message != "") {
        var errore = JSON.parse(JSON.stringify( err));
        var message = JSON.parse(errore.message._body);
        console.log(message.ExceptionMessage);
        this.alertUtil.presentAlertError(message.ExceptionMessage);
        this.loadingCtrl.dismiss();
        
        }  

    });


  }
  backPage(){    
    this.modal.dismiss();     
    }

}
