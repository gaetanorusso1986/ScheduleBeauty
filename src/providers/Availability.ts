import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constant from '../app/constants';




@Injectable()
export class Availability {
    private availability:any;
    constructor(public config: Config,  public httpClient:HttpClient,public http:Http,public device:Device){
        this.availability= null;    
}
Disponibilita(Service,day){

    var model ={
    
        'day': day,
        'Fk_beauty':Service 
    }

var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{        


        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
       this.http.post(Constant.GETALLFROMDATE,params,{
           headers:headers
       }).map(res=>res.json()).subscribe(data=>{
           if(data!=null)
           {
           resolve(data);
           }
           else
           {reject(data);}
       }, err => {
         console.log( + err)
         
         reject({message: err });
       });
  
});

}


}