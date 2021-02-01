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
}
@Injectable()
@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.page.html',
  styleUrls: ['./prenotazione.page.scss'],
})
export class PrenotazionePage implements OnInit {
idBeauty:string;
public beautyDetail: beautyDetails;
public dateDisponibilita:string;
public service:string;
  public resultList:any;
  date: string;
date1:string; 
  public note:string;
  public enabledPrenota=0;
  public IdEvent:string;
  buttonValue=0;
  buttonColor: string = 'secondary';
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    color:'primary',
    pickMode: 'single',
    monthFormat:'MMM YYYY',
    weekdays: ['D','L','M','M','G','V','S'],
    monthPickerFormat:['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC']    
  };
  platform: any;
constructor(public navCtrl:NavController, public modalCtrl: ModalController, public beauty:Beauty, 
  public loadingCtrl:LoadingService, private availability:Availability, public reservations: Reservations,
  private alertUtil: AlertUtil,public navParams: NavParams,public route:ActivatedRoute,
  private sanitizer: DomSanitizer,public user:User){
    moment.locale('it-it');
  }


  ngOnInit() {
    this.date1='';
    this.beautyDetail= new beautyDetails();
   this.Details(this.route.snapshot.paramMap.get('id'));
  }

  Details(id)
  {
    this.loadingCtrl.present();
    this.beauty.GetDetails(id).then((result:beautyDetails)=>{   
      this.loadingCtrl.dismiss();   
        this.beautyDetail=result;
         
      console.log(result);
  
     }).catch((err)=>{
    
      this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));

      
      this.alertUtil.presentAlertError(errore._body);  
    
    });
  }
  VaiAprenota(beautyDetail){
    let Id= beautyDetail.Id;
    this.navCtrl.navigateRoot(["beauty-details",{
      id: Id
     }]);

  }
  display(b64: string) {
    return this.sanitizer.bypassSecurityTrustUrl("data:image/*;base64," + b64);
  }
  addEvent(Id, event){
  
    this.buttonValue = Id;
    this.IdEvent=event.target.value;
    this.enabledPrenota=1;  
    }
    onChange($event) {
      // this.date=($event).format('DD-MM-YYYY');
      console.log(($event).format('DD-MM-YYYY')); 
     }
    VerficaDisponibilita(){
      this.loadingCtrl.present();
      
      this.resultList=null;
      
      this.enabledPrenota=0;
      if(this.service==null || this.date==null)
      {
        this.alertUtil.presentAlert("Indicare un servizio ed una data");
        this.loadingCtrl.dismiss();
        return;
      }
      var service = this.service;
      var date= moment(this.date).format("DD-MM-YYYY");
      this.availability.Disponibilita(service,date).then((result:[])=>{
        
        if(result.length>0)
        {
          
            this.resultList=result;
        }
        else
        this.alertUtil.presentAlert("Non ci sono disponibilità per questo giorno");
    
    
        this.loadingCtrl.dismiss();
    
     }).catch((err)=>{
      this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));

      
      this.alertUtil.presentAlertError(errore._body);    
    });
    
    }

 Prenota(beautyDetail)
{ 
  let Id= beautyDetail.Id;
  
  this.navCtrl.navigateRoot(["service-list",{
    id: Id
   }]); 
}
public openMapsApp(location: any) {
 
  window.location.href = "geo:" + "24 Spring Street, New York, NY";
 
}


}
