import { Component, OnInit } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {Reservations} from '../../providers/Reservations';
import {Injectable} from '@angular/core';
import {LoadingService} from '../LoadingService';
import { AlertUtil } from '../../app/alertUtil';
import {User} from '../../providers/user';


@Injectable()
@Component({
  selector: 'app-reservations-received',
  templateUrl: './reservations-received.page.html',
  styleUrls: ['./reservations-received.page.scss'],
})
export class ReservationsReceivedPage implements OnInit {
  listReservatsion:any;
  constructor(public navCtrl:NavController, private modalCtrl: ModalController, 
    public reservations:Reservations, 
    public loadingCtrl:LoadingService,
    private alertUtil: AlertUtil,
    private user:User)  { }
    service:string='00000000-0000-0000-0000-000000000000';
  ngOnInit() {
       
    this.GetReservations(this.service,this.user.user.FK_Beauty);
  }
  GetReservations(service, beauty) {
    this.loadingCtrl.present();
    this.reservations.GetAllReservations(service,beauty).then((result)=>{
      console.log(result);
      this.listReservatsion= result;
      this.loadingCtrl.dismiss();
    
    this.listReservatsion= result;
   }).catch((err)=>{
    this.loadingCtrl.dismiss();
  });
  }

}
