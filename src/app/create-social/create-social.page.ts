import { Component, OnInit, Input } from '@angular/core';

import { ModalController, NavController, NavParams } from '@ionic/angular';
import {Injectable} from '@angular/core';
import { AlertUtil } from '../../app/alertUtil';
import {LoadingService} from '../LoadingService';
import {Social} from '../../providers/Social';
import { ActivatedRoute } from '@angular/router';
import { SocialPage } from '../social/social.page';

export class Socials {
  Id: string;  
  Description: string;
  Name: string;    
  Fk_beauty :string;
}

@Injectable()
@Component({
  selector: 'app-create-social',
  templateUrl: './create-social.page.html',
  styleUrls: ['./create-social.page.scss'],
})
export class CreateSocialPage implements OnInit {
  @Input("value") value;
  public addsocial:Socials
  public social:string;
  constructor(public soc:Social,public route:ActivatedRoute,
    public navCtrl: NavController,  public loadingCtrl:LoadingService, private alertUtil: AlertUtil,
    public modal: ModalController, public socialpage:SocialPage ) { 
    //settare fk_beauty
    this.addsocial= new Socials();

    
    console.log(this.addsocial);
    this.social="";
  }
 
  ngOnInit() {
    this.addsocial.Fk_beauty=this.value;
  }
  backPage(){
    
  this.modal.dismiss();
    

  }
  Save()
  {  
    this.loadingCtrl.present();
    this.addsocial.Name=this.social;
    let checkSocial = this.addsocial;
    if(!checkSocial.hasOwnProperty("Name") )
    {
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlertError("Inserire tutte le informazioni");
      return;
    }
    if(!checkSocial.hasOwnProperty("Description") )
    {
      
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlertError("Inserire tutte le informazioni");
      return;
    }
    if(!checkSocial.hasOwnProperty("Fk_beauty") )
    {
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlertError("Si è verificato un problema si prega di risprovare più tardi");
      return;
    }
  
    this.soc.Save(this.addsocial.Name, this.addsocial.Description, this.addsocial.Fk_beauty).then((result)=>{
      
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlert("Salvataggio avvenuto !");
     
     this.socialpage.dismiss(this.addsocial.Fk_beauty);
   
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

}
