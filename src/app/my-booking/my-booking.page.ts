import { Component, OnInit, DebugElement } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {Reservations} from '../../providers/Reservations';
import {User} from '../../providers/user';
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

  public myBookingList: [];
  public selectedLeave;
  public variableClass : string;
  constructor(public navCtrl:NavController, private modalCtrl: ModalController, 
    public reservations:Reservations, 
    public loadingCtrl:LoadingService,
    private alertUtil: AlertUtil,
    public route:ActivatedRoute,
    public user:User) {
      
     }

  ngOnInit() {
    this.myBookingList=[];
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
  let user=null
  if(this.user.user!= null)
      user = this.user.user.Id;
  this.reservations.mybooking(user).then((result:[])=>{
    
    this.myBookingList=result;
    
    
  
  }).catch((err)=>{
  
    this.loadingCtrl.dismiss();
    var errore = JSON.parse(JSON.stringify( err.message));

    
    this.alertUtil.presentAlertError(errore._body);    
  
  });

}
isExpirationExpired(product) { 
  
  let dtBooking=  moment(product.DateReservation).format('YYYYMMDD')  +", "+ product.Disponibilita.Hour
  let data = moment().format('YYYYMMDD,  HH:mm:ss');  
   
  return dtBooking>=data;
}

}
