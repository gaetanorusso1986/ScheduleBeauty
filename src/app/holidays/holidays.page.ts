import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import { Holidays } from '../../providers/Holidays';
import * as moment from 'moment';
import { AlertUtil } from '../alertUtil';

import { ModalController, NavController } from '@ionic/angular';
import { CreateHolidaysPage } from '../create-holidays/create-holidays.page';
import { NgModel } from '@angular/forms';
import { LoadingService } from '../LoadingService';
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
})
export class HolidaysPage implements OnInit {
  myDate:string;
  myday:string; 
  errorMessage:string='';
  public list:[];
  constructor(public loadingCtrl:LoadingService,public navCtrl: NavController,public user:User,public holidays: Holidays,private alertUtil: AlertUtil,public modalCtrl: ModalController) { }

  ngOnInit() {
    this.errorMessage='';
     this.myDate='';
    this.list=[];
  }
  async AddHoliday()
  {
    
  let beauty= this.user.user.beauty;
    const modal = await 
    this.modalCtrl.create({
      component: CreateHolidaysPage,
     componentProps: { valueHoliday: beauty, mydate:this.myDate }      
    });    
    modal.onDidDismiss().then((modalData) => {
      
      this.SearchDay();
    });
    return await modal.present();
      

  }
  async UpdateHoliday(item)
  {
  
    const modal = await 
    this.modalCtrl.create({
      component: CreateHolidaysPage,
     componentProps: { value: item }      
    });    
    modal.onDidDismiss().then((modalData) => {
      
      this.SearchDay();
    });
    return await modal.present();    

  }
  GetSingle(item)
  {
    console.log(item.Service.Id);
    this.holidays.GetSingleByFk(item.Id, item.Service.Id).then((result:[])=>{     
      if(result.length>0)
      {
        this.UpdateHoliday(result);
//        this.list=result;
      }
      else
      {
       this.alertUtil.presentAlertError("Nessuna informazione trovata");
      }
    }).catch((err)=>{  
      this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
      this.alertUtil.presentAlertError(errore._body);      
      });
  }
  backPage(){    
    this.navCtrl.navigateRoot("settings"); 
    }
  SearchDay(){
    
    //this.loadingCtrl.present();
    this.list=[];
    if(this.myDate!=null)
    {
      let _searchDate=moment(this.myDate).format("YYYY-MM-DD");
      this.holidays.SearchDay(_searchDate).then((result:[])=>{        
      if(result.length>0)
      {
        console.log(result);
       this.errorMessage='';
        this.list=result;
        this.loadingCtrl.dismiss();
      }
      else
      {
        this.errorMessage="Nessuna informazione trovata";
        this.loadingCtrl.dismiss();
      }
     
      }).catch((err)=>{  
        this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
      this.alertUtil.presentAlertError(errore._body);        
        });
    }
    else
    {
      this.alertUtil.presentAlertError("Seleziona il giorno");
      this.loadingCtrl.dismiss();
    }
  }
}
