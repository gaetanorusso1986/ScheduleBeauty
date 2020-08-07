import { Component, OnInit, DebugElement } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {Reservations} from '../../providers/Reservations';
import {Injectable} from '@angular/core';
import { AlertUtil } from '../../app/alertUtil';
import {ActivatedRoute} from '@angular/router';
import {LoadingService} from '../LoadingService';
import { ModalPagePage } from '../modal-page/modal-page.page';
import * as moment from 'moment';


@Injectable()
@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.page.html',
  styleUrls: ['./my-booking.page.scss'],
})
export class MyBookingPage implements OnInit {

  public myBookingList: any;
  public selectedLeave;
  constructor(public navCtrl:NavController, private modalCtrl: ModalController, 
    public reservations:Reservations, 
    public loadingCtrl:LoadingService,
    private alertUtil: AlertUtil,
    public route:ActivatedRoute) {
      
     }

  ngOnInit() {
   this.mybooking();
  }

   async openModal(Id){
    const modal = await this.modalCtrl.create({
      component: ModalPagePage,
      componentProps: { value: Id }
      
    });
 
    return await modal.present();  
  } 


  
  
mybooking()
{
  this.reservations.mybooking(null).then((result)=>{
    
    this.myBookingList=result;
    
    
  
  }).catch((err)=>{
  
  var errore = JSON.parse(JSON.stringify( err));
  
  console.log(errore.ExceptionMessage);
  this.alertUtil.presentAlertError(errore.Message);
  
  });

}
isExpirationExpired(product) { 
  let data = moment().format('YYYYMMDD');
  let dateBooking = moment(product.DateReservation).format('YYYYMMDD');
  console.log(dateBooking>= data);
  return dateBooking>=data;
}

}
