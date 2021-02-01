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
AddPrenotazione(day, disponibilita, FK_Service,FK_Operator,customer,note,hour)
{   
    var model ={            
        'DateReservation':day,
        'FK_Availability':disponibilita ,
        'FK_Service_Beauty': FK_Service,
        'FK_Operator':FK_Operator,
        'FK_User': customer,
        'uuid':this.device.uuid,//this.device.version,//
        'Note':note,
        'hour':hour
        }

    var params = JSON.stringify(model);   
        return new Promise((resolve, reject)=>{       
        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
        this.http.post(Constant.RESERVATIONS_SERVICE,params,{
           headers:headers
         }).map(res=>res.text()).subscribe(data=>{          
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
        'FK_User': customer,
        'uuid':this.device.uuid,    
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
GetAllReservations(service, beauty,date)
{
    var model ={
        'FK_Service':  service ,
        'FK_Beauty':beauty,
        'DateReservation':date

        };
        var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{        
        //this.http.post(Constant.GETALLRESERVATION+"?service="+service+"&beauty="+beauty,{

        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
       this.http.post(Constant.GETALLRESERVATION,params,{
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