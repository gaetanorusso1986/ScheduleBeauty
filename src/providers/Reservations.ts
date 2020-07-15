import { Injectable } from '@angular/core';
import { Config, IonicModule } from '@ionic/angular';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constant from '../app/constants';



@Injectable()
export class Reservations {
    private reservations:any;
    constructor(public config: Config,  public httpClient:HttpClient,public http:Http,public device:Device){
        this.reservations= null;    
}
AddPrenotazione(day, disponibilita, customer,note)
{

    var model ={    
        //da aggiungre uuid
        'Date':day,
        'FK_Availability':disponibilita ,
        'FK_Customer': customer,
        'uuid':this.device.version,//this.device.uuid,
        'Note':note
        }

var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{        


        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
       this.http.post(Constant.RESERVATIONS_SERVICE,params,{
           headers:headers
       }).map(res=>res.json()).subscribe(data=>{
          
           resolve(data);
          
       }, err => {
         console.log( + err)
         
         reject({message: err });
       });
  
});

}
reservationDetail(Id)
{
//RESERVATIONS_SERVICE
return new Promise((resolve, reject)=>{        


    var headers= new Headers();         
    headers.append('Content-Type','application/json; charset=utf-8');
   this.http.get(Constant.RESERVATIONS_SERVICE+"/"+Id,{
       headers:headers
   }).map(res=>res.json()).subscribe(data=>{
      
       resolve(data);
      
   }, err => {
     console.log( + err)
     
     reject({message: err });
   });

});

}

mybooking(customer)
{
    var model ={ 
        'FK_Customer': customer,
        'uuid':'83.0.4103.116'//this.device.version//this.device.uuid,    
        }

var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{        


        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
       this.http.post(Constant.MYBOOKING,params,{
           headers:headers
       }).map(res=>res.json()).subscribe(data=>{
          
           resolve(data);
          
       }, err => {
         console.log( + err)
         
         reject({message: err });
       });
  
});


}
RemoveBooking(Id)
{
    var model ={    
        'Id':Id
        };
        var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{        


        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
       this.http.post(Constant.REMOVE,params,{
           headers:headers
       }).map(res=>res.json()).subscribe(data=>{
          
           resolve(data);
          
       }, err => {
         console.log( + err)
         
         reject({message: err });
       });
  
});
    
}
}