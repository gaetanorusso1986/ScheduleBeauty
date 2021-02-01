import {AppComponent} from '../app.component';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { Reservations } from 'src/providers/Reservations';
import { User } from 'src/providers/user';
import {Availability} from  '../../providers/Availability';
import { AlertUtil } from '../alertUtil';
import { LoadingService } from '../LoadingService';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
public today:String;
public hours_list:Array<{Id: string,Hour:string, workstations:string,checked:boolean}>
idBeauty:string;
idOperator:string;
nota:string;
checkedIdx=0;
date: Date;
idHour:string;
hour:string;
  idservice:string;
  constructor(public myapp: AppComponent,public navCtrl:NavController,public user:User,private alertUtil: AlertUtil,public loadingCtrl:LoadingService, public route:ActivatedRoute,private availability:Availability, public reservations: Reservations) { }

  ngOnInit() {    
    this.idBeauty = this.route.snapshot.paramMap.get('id');
    this.idservice=this.route.snapshot.paramMap.get('service');
    this.idOperator=this.route.snapshot.paramMap.get('operator');
    this.hours_list=[];
    this.today=new Date().toISOString();
    this.GetAllHours(this.today);
  }
  selection(name: string) {
    this.hours_list.forEach(x => {
      
      if (x.Hour !== name) {
        x.checked = false;
      }
      else
      {
        this.idHour=x.Id;
        this.hour=x.Hour;
      }
    })
  }
updateMyDate(event)
{
  this.GetAllHours(event);
}
  GetAllHours(dateselect)
  {
    this.loadingCtrl.present();  
    let date= moment(dateselect).format("DD-MM-YYYY");
    this.availability.Disponibilita( this.idBeauty,date).then((result:Array<{Id: string,Hour:string, workstations:string, checked:boolean}>)=>{
    this.loadingCtrl.dismiss();
    this.hours_list=[];  
    if(result.length>0)
        {
          this.hours_list= result;
        }
        console.log(this.hours_list);
    });
  }
  BackPage()
  {
    
  
    this.navCtrl.navigateRoot(['operator-list',{
      id: this.route.snapshot.paramMap.get('id')
     }]);    
  }

  Prenota()
  {
    this.loadingCtrl.present();
    let user=null;
    if(this.user.user!=null)
      user= this.user.user.Id;
    else if(this.nota==null || this.nota==""){
      
      this.alertUtil.presentAlertError("Non sei loggato, aggiungi un recapito telefonico o accedi");
      this.loadingCtrl.dismiss();
      return;
    }

    if(this.idHour==null || this.idHour ==undefined)
    {
      this.loadingCtrl.dismiss();
      this.alertUtil.presentAlertError("Selezionare un orario prima di prenotare");
      return;
    }
    this.reservations.AddPrenotazione(this.today,this.idHour,this.idservice,this.idOperator,user,this.nota,this.hour).then(res=>{

    this.loadingCtrl.dismiss();
    this.alertUtil.presentAlert("Prenotazione avvenuta con successo").then(index=>{      
     
     this.navCtrl.navigateRoot('home');
    });
    }).catch(err=>{
      this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));
      this.alertUtil.presentAlertError(errore._body);  
    });
  }
  

}


