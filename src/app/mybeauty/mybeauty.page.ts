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
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ActionSheetController } from '@ionic/angular';

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
  FiscalCode:string;
  PhotoBase64:string;
}

@Component({
  selector: 'app-mybeauty',
  templateUrl: './mybeauty.page.html',
  styleUrls: ['./mybeauty.page.scss'],
})
export class MybeautyPage implements OnInit {
  profile:beautyDetails;
  imageResponse: any;
  options: any;
  constructor(
    public route:ActivatedRoute,public navCtrl: NavController, 
    public beauty:Beauty,  public social:Social,  private alertUtil: AlertUtil,
    public loadingCtrl:LoadingService,private sanitizer: DomSanitizer,
    public modalCtrl: ModalController, public location:Location,public camera : Camera,public actionSheetController: ActionSheetController) {
      this.profile=new beautyDetails();

     }

  ngOnInit() {
    
    this.getBeauty(JSON.parse(this.route.snapshot.paramMap.get('idbeauty')));
   
  }
  backPage()
  {

    this.navCtrl.navigateBack("/settings");

  }
  async EditProfile(profile){
    const modal = await this.modalCtrl.create({
      component: MyprofilePage,
      componentProps: { value: profile }      
    });
    return await modal.present();  
    
  }
  choosePhoto(){
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
     
     // this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }
  async getPhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = imageData;

      this.updatePhoto(base64Image);

    }, (err) => {
      // Handle error
    });
  }
  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      let base64Image =  imageData;
     
      this.updatePhoto(base64Image);
      

    }, (err) => {
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
      this.alertUtil.presentAlertError(errore._body);
      this.loadingCtrl.dismiss();  
    });

    await this.modalCtrl.dismiss();
  }
  update(){
    this.loadingCtrl.present();
    this.beauty.Update(this.profile).then((result)=>{

      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlert("Aggiornamento avvenuto con successo");
    }).catch((err)=>{
      this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));

      
      this.alertUtil.presentAlertError(errore._body);
        
    });
    
    console.log(this.profile);
      
    
  }
  updatePhoto(image){
    this.loadingCtrl.present();
    this.profile.PhotoBase64=image;
    
    this.beauty.Update(this.profile).then((result)=>{

      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlert("Aggiornamento avvenuto con successo");
    }).catch((err)=>{
      this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));      
      this.alertUtil.presentAlertError(errore._body);
    });
    
    console.log(this.profile);
      
    
  }


  display(b64: string) {
    
    return this.sanitizer.bypassSecurityTrustUrl("data:image/*;base64," + b64);
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Scatta Foto',
        role: 'destructive',
        icon: 'camera-outline',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: 'Apri Album',
        icon: 'images-outline',
        handler: () => {
         this.getPhoto(0);
        }
      }, {
        text: 'Chiudi',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }



  getBeauty(id)
  {
    this.loadingCtrl.present();
    if(id!=null)
    {
    this.beauty.GetDetails(id).then((result:beautyDetails)=>{
     
      this.profile=result;
      this.loadingCtrl.dismiss();

    }).catch((err)=>{
      this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));      
      this.alertUtil.presentAlertError(errore._body);


    });
  }

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
