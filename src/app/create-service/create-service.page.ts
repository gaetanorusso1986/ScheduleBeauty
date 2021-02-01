import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import {Service} from '../../providers/Service';
import { ModalController, NavController } from '@ionic/angular';
import { LoadingService } from '../LoadingService';
import { AlertUtil } from '../alertUtil';
export class ServiceDetails{
  Id: string;
  typeService: string;
  dayclose: [];
  days:string;
  openTime:string;
  closedTime:string;
  rangeTime: string; 
  startTime: string;
  closeTime: string;
  numpostazioni:number;
  FK_Beauty:string

}

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {
  @Input("value") value;
  public createService:ServiceDetails;
    public dayclose:[];
  constructor( public service:Service,public modal: ModalController,public loadingCtrl:LoadingService,
    private alertUtil: AlertUtil,public navCtrl:NavController) { 
    this.createService= new ServiceDetails();
    this.createService.dayclose=[];
    //this.createService.startTime= new Date();
    moment.locale('it-it');
  }

  ngOnInit() {
    this.createService.FK_Beauty=this.value;
  }
  backPage(){    
    this.modal.dismiss();     
  
    }
  SaveService(){
this.loadingCtrl.present();    
let days= this.createService.dayclose.join(',');
let close= moment(this.createService.closeTime).format('LT');
let open =  moment(this.createService.startTime).format('LT');

let addservice = this.createService;
let diff = moment(close, 'HH:mm').diff(moment(open, 'HH:mm'))
if(days == "" || !addservice.hasOwnProperty("typeService")|| 
!addservice.hasOwnProperty("rangeTime")|| !addservice.hasOwnProperty("startTime")||!addservice.hasOwnProperty("closeTime")
|| !addservice.hasOwnProperty("numpostazioni"))
{
       this.alertUtil.presentAlertError("Inserire tutte le informazioni");
       this.loadingCtrl.dismiss();     
        return false;
} 
if(diff<=0)
{
  this.alertUtil.presentAlertError("Gli orari di apertura e chiusura non sono corretti");
       this.loadingCtrl.dismiss();     
        return false;
}
   
this.createService.days= days;
this.createService.closedTime = close;
this.createService.openTime = open;
this.service.Save(this.createService).then((result)=>{

    this.alertUtil.presentAlert("Inserimento avvenuto con successo !")
    this.loadingCtrl.dismiss();
    this.modal.dismiss();
   // this.navCtrl.navigateRoot('/settings');
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

