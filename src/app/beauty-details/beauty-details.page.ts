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

export class beautyDetails {
  Id: string;
  Indirizzo: string;
  Description: string;
  Name: string;
  vatNumber: string;
  businessName: string;
  Service: any;
  
}
@Injectable()
@Component({
  selector: 'app-beauty-details',
  templateUrl: './beauty-details.page.html',
  styleUrls: ['./beauty-details.page.scss'],
})
export class BeautyDetailsPage implements OnInit {
  public beautyDetail: beautyDetails;
  public service:string;
  public dateDisponibilita:string;
  public resultList:any;
  date: string;
  public enabledPrenota=0;
  public IdEvent:string;
  buttonValue=0;
  buttonColor: string = 'secondary';
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    color:'primary',
    pickMode: 'single',
    monthFormat:'MMM YYYY',
    weekdays: ['D','L','M','M','G','F','S'],
    monthPickerFormat:['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC']    
    
   
  };
  constructor(public navCtrl:NavController, public modalCtrl: ModalController, public beauty:Beauty, 
    public loadingCtrl:LoadingService, private availability:Availability, public reservations: Reservations,
    private alertUtil: AlertUtil,public navParams: NavParams,public route:ActivatedRoute) { 
      moment.locale('it-it');
    }

  ngOnInit() {
        this.beautyDetail= new beautyDetails();
 

    this.Details(this.route.snapshot.paramMap.get('id'))
    
  }
  onChange($event) {
    this.date=($event).format('DD-MM-YYYY');
    console.log(($event).format('DD-MM-YYYY')); 
  }

  Details(id)
{
  this.beauty.GetDetails(id).then((result:beautyDetails)=>{
    
      this.beautyDetail=result;
    console.log(result);

   }).catch((err)=>{
  
    if(err!=null)
    {
    var errore = JSON.parse(JSON.stringify( err));
  
    console.log(errore.ExceptionMessage);
    this.alertUtil.presentAlertError(errore.Message);
    }
  
  });
}

addEvent(Id, event){
  debugger;
  this.buttonValue = Id;
  this.IdEvent=event.target.value;
  this.enabledPrenota=1;
  
  }

VerficaDisponibilita(){
  this.resultList=null;
  
  this.enabledPrenota=0;
  var service = this.service;//'77aa8213-05c7-46fd-9871-a6b1a59eb5a9';
  var date= this.date;
  this.availability.Disponibilita(service,date).then((result)=>{
    
    //Svuoteare la grid ogni volta
    this.resultList=result;

 }).catch((err)=>{

  var errore = JSON.parse(JSON.stringify( err));

  console.log(errore.ExceptionMessage);
  this.alertUtil.presentAlertError(errore.Message);

});

}
Prenota()
{
  this.resultList=null;

this.reservations.AddPrenotazione(this.date, this.IdEvent,this.availability.device.uuid,'').then((result)=>{
    
  //il customer da inserire nei parametri si riferisce all'utente loggato
  this.alertUtil.presentAlert("Prenotazione avvenuta con successo");
  this.enabledPrenota=0;

}).catch((err)=>{

var errore = JSON.parse(JSON.stringify( err));

console.log(errore.ExceptionMessage);
this.alertUtil.presentAlertError(errore.Message);

});   


}

}
