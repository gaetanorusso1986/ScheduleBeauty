import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constant from '../app/constants';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Injectable()
export class Service {

    private service:any;
    constructor(public config: Config,  public httpClient:HttpClient,public http:Http,public device:Device){
            this.service= null;    
    }

    Save(service)
    {
        return new Promise((resolve,reject) => {
            debugger;
            var item =  {
               "Name": service.typeService,
               "DayClose":service.days,
               "CloseHour":service.closedTime,
               "startHour": service.openTime,
                "RangeTime":service.rangeTime,
                "WorkStations":service.numpostazioni,               
                "FK_Beauty": service.FK_Beauty
            }
            
            var headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=utf-8');
            var params = item;
            console.log(params);
            this.http.post(Constant.SERVICE,
                params, {
                    headers: headers
                })
                .map(res => res.json())
                .subscribe(
                  data => {            
                    console.log( + data)
                      resolve({message:'Inserimento avvenuto con successo'});             
    
                  },
                  err => {
                    
                    console.log( + err)
                    reject({message: err });
                  },
                  () => {        
                    return false;
            
                  });
        });

    }
    remove(id)
    {
        return new Promise((resolve,reject) => {
            
            var item =  {
            "Id":id
            }
            var headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=utf-8');
            var params = item;
            console.log(params);
            this.http.post(Constant.REMOVE_SERVICE,
                params, {
                    headers: headers
                })
                .map(res => res.json())
                .subscribe(
                  data => {            
                    console.log( + data)
                      resolve({message:'Eliminazione avvenuto con successo'});             
    
                  },
                  err => {
                    
                    console.log( + err)
                    reject({message: err });
                  },
                  () => {        
                    return false;
            
                  });
        });

    }

    
    get_single(Id){

      return new Promise((resolve, reject)=>{        

        var item =  {
          "Id":Id
          }
          var params = item;
        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
        this.http.get(Constant.SERVICE+"/"+Id,
          {
              headers: headers
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



    getAll(FK_Beauty){

      return new Promise((resolve, reject)=>{        

        var item =  {
          "FK_Beauty":FK_Beauty
          }
          var params = item;
        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
        this.http.post(Constant.GETALL_SERVICE,
          params, {
              headers: headers
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
    updateService(service)
    {
      return new Promise((resolve,reject) => {
            
        var item =  {
          "Id":service.Id,
           "Name": service.Name,                
            "DayClose":service.DayClose,
            "CloseHour":service.CloseHour,
            "startHour": service.startHour,
             "RangeTime":service.RangeTime,
             "WorkStations":service.WorkStations,               
             "FK_Beauty": service.FK_Beauty
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var params = item;
        console.log(params);
        this.http.post(Constant.SERVICE,
            params, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
              data => {            
                console.log( + data)
                  resolve({message:'Aggiornamento avvenuto con successo'});             

              },
              err => {
                
                console.log( + err)
                reject({message: err });
              },
              () => {        
                return false;
        
              });
    });

    }


}