import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import {Beauty} from '../../providers/beauty';
import {Availability} from  '../../providers/Availability';
import {Reservations} from  '../../providers/Reservations';
import {Injectable} from '@angular/core';
import { AlertUtil } from '../../app/alertUtil';
import {LoadingService} from '../LoadingService';
import {ActivatedRoute} from '@angular/router';
import { CalendarComponentOptions } from 'ion2-calendar'
import * as moment from 'moment';
import {User} from '../../providers/user';
import { DomSanitizer } from '@angular/platform-browser';


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
  isActive: boolean;
}
@Injectable()
@Component({
  selector: 'app-beauty-details',
  templateUrl: './beauty-details.page.html',
  styleUrls: ['./beauty-details.page.scss'],
})
export class BeautyDetailsPage implements OnInit {
  public beautyDetail: beautyDetails;
  public isActive: boolean;
  public userID:string;

  constructor(public navCtrl:NavController, public modalCtrl: ModalController, public beauty:Beauty,
    public loadingCtrl:LoadingService, private availability:Availability, public reservations: Reservations,
    private alertUtil: AlertUtil,public navParams: NavParams,public route:ActivatedRoute,
    private sanitizer: DomSanitizer,public user:User)
  {

   
    }

  ngOnInit() {
   this.beautyDetail= new beautyDetails();
   
   this.isActive=JSON.parse (this.route.snapshot.paramMap.get('active'));
    this.Details(this.route.snapshot.paramMap.get('id'));
    this.userID=this.route.snapshot.paramMap.get('idUser')
    
    
    }
 

  Details(id){
    this.loadingCtrl.present();
    this.beauty.GetDetails(id).then((result:beautyDetails)=>{
      this.loadingCtrl.dismiss();
      this.beautyDetail=result;
      this.beautyDetail.isActive=this.isActive;
      
      if(this.beautyDetail.Photo!=null)
      {
        var imageData = btoa(this.beautyDetail.Photo);
      }
   }).catch((err)=>{
    this.loadingCtrl.dismiss();
    var errore = JSON.parse(JSON.stringify( err.message));
    this.alertUtil.presentAlertError(errore._body);  
  });
}




display(b64: string) {
  return this.sanitizer.bypassSecurityTrustUrl("data:image/*;base64," + b64);
}
Update()
{
  this.loadingCtrl.present();
  this.user.ActiveUserFromAdmin(this.userID,this.isActive).then((result)=>{
    this.loadingCtrl.dismiss();
    this.alertUtil.presentAlert("Operazione avvenuto correttamente").then(()=>{
      this.navCtrl.navigateRoot("customers");
      
    });
    

  }).catch((err)=>{
    this.loadingCtrl.dismiss();
    var errore = JSON.parse(JSON.stringify( err.message));
    this.alertUtil.presentAlertError(errore._body);  
  });
}
numberOnlyValidation(event: any) {
  const pattern = /[0-9.,]/;
  let inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}

}
