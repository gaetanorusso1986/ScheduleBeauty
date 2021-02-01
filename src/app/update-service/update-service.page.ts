import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import {Service} from '../../providers/Service';
import { ModalController, NavController } from '@ionic/angular';
import { LoadingService } from '../LoadingService';
import { AlertUtil } from '../alertUtil';

export class ServiceDetails{
  Id: string;
  Name:string;
  typeService: string;
  days: [];
  closedays:[];
  DayClose:string;
  openTime:string;
  closedTime:string;
  RangeTime: string; 
  startHour: string;
  CloseHour: string;
  WorkStations:number;
  FK_Beauty:string
  startTime: string;
  closeTime: string;

}
@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.page.html',
  styleUrls: ['./update-service.page.scss'],
})
export class UpdateServicePage implements OnInit {
  @Input("value") value;
  public service_list:[];
  public createService:ServiceDetails;
  constructor( public service:Service,public modal: ModalController,public loadingCtrl:LoadingService,
    private alertUtil: AlertUtil,public navCtrl:NavController)  {     this.service_list=[];}

  ngOnInit() {
   
   this.service.get_single(this.value).then((result:ServiceDetails)=>{
     
      this.createService= result;
      
      //console.log(this.createService);
   }).catch((err)=>{
    alert(err);

   });     
  }
  
  change(days){

  }
  backPage(){    
    this.modal.dismiss();     
  
    }
    SaveService(){     
  

      let close= this.createService.CloseHour;
      let open =  this.createService.startHour;
      this.loadingCtrl.present();
      let addservice = this.createService;
      let diff = moment(close, 'HH:mm').diff(moment(open, 'HH:mm'))
      if(  !addservice.hasOwnProperty("RangeTime")|| !addservice.hasOwnProperty("startHour")||!addservice.hasOwnProperty("CloseHour")
      || !addservice.hasOwnProperty("WorkStations"))
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
   
      if(this.createService.closedays!= null)
      {
        let days= this.createService.closedays.join(',');
        this.createService.DayClose= days;
      }
         
      
      this.createService.closeTime = close;
      this.createService.startTime = open;
      this.service.updateService(this.createService).then((result)=>{
      
          this.alertUtil.presentAlert("Inserimento avvenuto con successo !")
          this.loadingCtrl.dismiss();
          this.modal.dismiss();
          this.navCtrl.navigateRoot('/settings');
          }).catch((err)=>{
            this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
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
        RemoveService(item:any){
    
          this.alertUtil.presentConfirmRemove().then(res => {
           this.loadingCtrl.present();
          this.service.remove(item.Id).then((success:any)=>{
            
            let index: number =this.deepIndexOf(this.service_list,item);
                  if(index > -1){
                this.service_list.splice(index, 1);
                  } 
      
                  this.loadingCtrl.dismiss();
           
          this.alertUtil.presentAlert(success.message);
          this.modal.dismiss();
          
          
        }).catch((err)=>{
        
          this.loadingCtrl.dismiss();
          var errore = JSON.parse(JSON.stringify( err.message));
    
          console.log(errore._body);
          this.alertUtil.presentAlertError(errore._body);    
        });
        });
        
        
          }
          deepIndexOf(arr, obj) {
            return arr.findIndex(function (cur) {
              return Object.keys(obj).every(function (key) {
                return obj[key] === cur[key];
              });
            });
          }



}
