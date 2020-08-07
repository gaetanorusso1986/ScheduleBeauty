import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  NavController, ModalController } from '@ionic/angular';
import {Beauty} from '../../providers/beauty';
import {Social} from '../../providers/Social';
import { AlertUtil } from '../alertUtil';
import { LoadingService } from '../LoadingService';
import { DomSanitizer } from '@angular/platform-browser';
import { MyprofilePage } from '../myprofile/myprofile.page';
import { CreateSocialPage } from '../create-social/create-social.page';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import {Location} from '@angular/common';


export class beautyDetails {
  Id: string;
  Indirizzo: string;
  Description: string;
  Name: string;
  vatNumber: string;
  businessName: string;
  Service: any;
  Photo:any;
  displayImage :string;
}

@Component({
  selector: 'app-mybeauty',
  templateUrl: './mybeauty.page.html',
  styleUrls: ['./mybeauty.page.scss'],
})
export class MybeautyPage implements OnInit {
  profile:beautyDetails;
  constructor(
    public route:ActivatedRoute,public navCtrl: NavController, 
    public beauty:Beauty,  public social:Social,  private alertUtil: AlertUtil,
    public loadingCtrl:LoadingService,private sanitizer: DomSanitizer,
    public modalCtrl: ModalController, public location:Location) {
      this.profile=new beautyDetails();

     }

  ngOnInit() {
    
    this.getBeauty(JSON.parse(this.route.snapshot.paramMap.get('idbeauty')));
   
  }
  backPage()
  {

    this.navCtrl.navigateBack("/profile");

  }
  async EditProfile(profile){
    const modal = await this.modalCtrl.create({
      component: MyprofilePage,
      componentProps: { value: profile }      
    });
    return await modal.present();  
    
  }


  display(b64: string) {
    return this.sanitizer.bypassSecurityTrustUrl("data:image/*;base64," + b64);
  }
  async openModal(Id){
   /* const modal = await this.modalCtrl.create({
      component: ModalPagePage,
      componentProps: { value: Id }
      
    });
 
    return await modal.present();  */
  } 

  DetailsServices(Id)
  {
   /// passo i serivzi alla pagina servizi;
   /// nella pagina servizi inserisco un menu a tendina per visualizzare il dettaglio del 
   /// singolo servizi
   /// inoltre posso: chiudere il servizio, cambiare orario di apertura e chiusura ed
   /// aggiornare con altre info i servizi

  }

  getBeauty(id)
  {
    this.beauty.GetDetails(id).then((result:beautyDetails)=>{
      console.log(result);
      this.profile=result;
      

    }).catch((err)=>{
      if(err!=null)
    {
    var errore = JSON.parse(JSON.stringify( err));
  
    console.log(errore.ExceptionMessage);
    this.alertUtil.presentAlertError(errore.Message);
    }


    });
////chiamare il beauty
  }

  async AddSocial(Id){
    
    const modal = await 
    this.modalCtrl.create({
      component: CreateSocialPage,
      componentProps: { value: Id }      
    });
    
    return await modal.present(); 
   
  }

 

}
