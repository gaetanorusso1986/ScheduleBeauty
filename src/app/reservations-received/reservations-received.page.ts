import { Component, OnInit } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {Reservations} from '../../providers/Reservations';
import {Injectable} from '@angular/core';
import {LoadingService} from '../LoadingService';
import { AlertUtil } from '../../app/alertUtil';
import {User} from '../../providers/user';
import * as moment from 'moment';

@Injectable()
@Component({
  selector: 'app-reservations-received',
  templateUrl: './reservations-received.page.html',
  styleUrls: ['./reservations-received.page.scss'],
})
export class ReservationsReceivedPage implements OnInit {
  listReservatsion:[];
  mydate:string;
  constructor(public navCtrl:NavController, private modalCtrl: ModalController, 
    public reservations:Reservations, 
    public loadingCtrl:LoadingService,
    private alertUtil: AlertUtil,
    private user:User)  { }
    service:string='00000000-0000-0000-0000-000000000000';
  ngOnInit() {
    this.listReservatsion=[];
    this.mydate =moment(new Date()).format("YYYY-MM-DD");


    this.GetReservations(this.service,this.user.user.Beauty[0].Id,  this.mydate);
    // setInterval(() => {
    //   this.GetReservations(this.service,this.user.user.FK_Beauty,  this.mydate);
     
    // }, 2000);
 
    
  }

  doRefresh(event) {
    
    this.GetReservations(this.service,this.user.user.Beauty[0].Id,  this.mydate);
    setTimeout(() => {
      
      event.target.complete();
    }, 2000);
  }
  GetReservations(service, beauty, date) {

    
    this.loadingCtrl.present();
    this.reservations.GetAllReservations(service,beauty,date).then((result:[])=>{
      
      this.listReservatsion= result;
      
      this.loadingCtrl.dismiss();
    
    this.listReservatsion= result;
   }).catch((err)=>{
    this.loadingCtrl.dismiss();
    // var errore = JSON.parse(JSON.stringify( err.message));    
    // this.alertUtil.presentAlertError(errore._body);  
  });
  }

  optionsFn(){
    this.mydate =moment(this.mydate).format("YYYY-MM-DD");
    this.GetReservations(this.service,this.user.user.Beauty[0].Id,this.mydate);
    
  }

}
