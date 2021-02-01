import { Component, OnInit, Input, Injectable } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Holidays } from '../../providers/Holidays';
import * as moment from 'moment';
import { AlertUtil } from '../alertUtil';
import { LoadingService } from '../LoadingService';
export class HolidaysObject{
  HourFrom:string;
  Id:string;
  FK_Service:string;
  HourTo:string;
  AllDay:boolean;
  Description:string;
  Day:string;
  Date:string;
  Services:[];
  }
  @Injectable()
@Component({
  selector: 'app-create-holidays',
  templateUrl: './create-holidays.page.html',
  styleUrls: ['./create-holidays.page.scss'],
})

export class CreateHolidaysPage implements OnInit {
  @Input("value") value;
  @Input("valueHoliday") valueHoliday;
  @Input("mydate") mydate;
  
  holiday:HolidaysObject;
  constructor(public navParams: NavParams,public holidays: Holidays,
    private alertUtil: AlertUtil,public modalCtrl: ModalController,
    public loadingCtrl:LoadingService) {

    
   }

  ngOnInit() {
    this.holiday= new HolidaysObject();


if(this.valueHoliday!=null)
{
this.holiday.Services=[];
this.holiday.Services=this.valueHoliday.Service;
}

    
    
    
    if(this.value!=null)
    {
    this.holiday=this.value[0];
    if (this.holiday.HourFrom=="" && this.holiday.HourTo=="")
    {
    this.holiday.AllDay=true;
    }
    this.ConvertDay(this.holiday.Day);
    }

    }
    Save()
    {
      this.loadingCtrl.present();

      if(this.holiday.FK_Service==null)
      {
        this.alertUtil.presentAlertError("Selezionare un servizio");
             this.loadingCtrl.dismiss();     
              return false;
      }
      let close= moment(this.holiday.HourTo).format('LT');
      let open =  moment(this.holiday.HourFrom).format('LT');
      this.loadingCtrl.dismiss();
      
      let diff = moment(close, 'HH:mm').diff(moment(open, 'HH:mm'))
      if(diff<=0)
      {
        this.alertUtil.presentAlertError("Gli orari di apertura e chiusura non sono corretti");
             this.loadingCtrl.dismiss();     
              return false;
      }
      
      if(this.holiday.Id!=null)
      {

        this.holidays.Update(this.holiday).then((result)=>{     
          this.modalCtrl.dismiss().then(()=>{
            this.alertUtil.presentAlert("Inserimento avvenuto! "); 
            this.loadingCtrl.dismiss();
  
          });
         
        }).catch((err)=>{  
          this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
      this.alertUtil.presentAlertError(errore._body);       
           });

      }else
      {
      this.holiday.Date=moment(this.mydate).format("YYYY-MM-DD");
      this.holiday.Description="Ferie";
      
      console.log(this.holiday);
      this.holidays.Save(this.holiday).then((result)=>{     
        this.modalCtrl.dismiss().then(()=>{
          this.alertUtil.presentAlert("Inserimento avvenuto! "); 
          this.loadingCtrl.dismiss();

        });
       
      }).catch((err)=>{  
        this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
      this.alertUtil.presentAlertError(errore._body);       
         });
        }
    }
  Change()
  {
    if(this.holiday.AllDay)
    {
    this.holiday.AllDay=false;
    }
    else
    {   
      this.holiday.HourTo="";
      this.holiday.HourFrom="";
      this.holiday.AllDay=true;}
  }
  backPage(){    
    //this.navCtrl.navigateRoot("settings"); 
    this.modalCtrl.dismiss();
    }
  Delete(){

    this.holidays.Delete(this.holiday).then((result)=>{     
      this.modalCtrl.dismiss().then(()=>{
        this.alertUtil.presentAlert("Servizio eliminato ! "); 
        this.loadingCtrl.dismiss();

      });
     
    }).catch((err)=>{  
      this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
      this.alertUtil.presentAlertError(errore._body);      
        });
  
  }

  ConvertDay(day)
  {
    switch(day) { 
      case "1": { 
        this.holiday.Day="Lunedì";
         break; 
      } 
      case "2": { 
        this.holiday.Day="Martedì";
         break; 
      } 
      case "3": { 
        this.holiday.Day="Mercoledì";
         break; 
      } 
      case "4": { 
        this.holiday.Day="Giovedì";
         break; 
      } 
      case "5": { 
        this.holiday.Day="Venerdì";
         break; 
      }  
      case "6": { 
        this.holiday.Day="Sabato";
         break; 
      } 
       case "7": { 
        this.holiday.Day="Domenica";
         break; 
      } 
      default: { 
        this.holiday.Day="";
         break; 
      } 
    }
  }

}
