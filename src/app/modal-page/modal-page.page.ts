import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController} from '@ionic/angular';
import {Reservations} from '../../providers/Reservations';
import { AlertUtil } from '../alertUtil';
import * as moment from 'moment';


@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  public resultDetails:any;
  constructor(public modalCtrl: ModalController,
    public navParams: NavParams,
    private alertUtil: AlertUtil,
    public navCtrl:NavController,
    public reservations:Reservations) {
   }

  ngOnInit() {
    this.DetailReservations(this.navParams.data.value)
    
  }
  public closeModal(){
 this.modalCtrl.dismiss();
  }
  AnnullaPrenotazione(singleReservation){
this.reservations.RemoveBooking(singleReservation.Id).then((result)=>{
    
  this.alertUtil.presentAlert("Prenotazione annullata correttamente");
  this.modalCtrl.dismiss();
  this.navCtrl.back();

}).catch((err)=>{
  var errore = JSON.parse(JSON.stringify( err));  
  console.log(errore.ExceptionMessage);
  this.alertUtil.presentAlertError(errore.Message);
  
  });

  }
  DetailReservations(id)
  {
  this.reservations.reservationDetail(id).then((result)=>{
    
    this.resultDetails=result;
    console.log(result);

  }).catch((err)=>{
  
    var errore = JSON.parse(JSON.stringify( err));
    
    console.log(errore.ExceptionMessage);
    this.alertUtil.presentAlertError(errore.Message);
    
    });

}
}
