import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constant from '../app/constants';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { constants } from 'buffer';




@Injectable()
export class Beauty {

    private beauty:any;
    public loggedIn : boolean= false;
    constructor(public config: Config,  public httpClient:HttpClient,public http:Http,public device:Device){
            this.beauty= null;    
    }
    
    GetAll()
    {   
      
        return new Promise((resolve, reject)=>{       


                 var headers= new Headers();         
                 headers.append('Content-Type','application/json; charset=utf-8');
                this.http.get(Constant.GETALL_BEAUTY,{
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
    GetDetails(id)
    {
        return new Promise((resolve, reject)=>{        


            var headers= new Headers();         
            headers.append('Content-Type','application/json; charset=utf-8');
           this.http.get(Constant.GETDETAILS_BEAUTY+"/"+id,{
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

    Update(item){
            
        var model ={
        
            'Id':item.Id,
            'Name':item.Name,
            "Description":item.Description,
            'Indirizzo':item.Indirizzo,
            'PhotoBase64':item.PhotoBase64,
            'FiscalCode':item.FiscalCode,
            'FK_Service':item.FK_Service 
        }

        let url ;
        if(item.Id==null)
        {
            url=Constant.BEAUTY_SERVICE
        }
        else
        {
            url=Constant.UPDATEBEAUTY
        }

        var params = JSON.stringify(model);   
        return new Promise((resolve, reject)=>{    
            var headers= new Headers();         
            headers.append('Content-Type','application/json; charset=utf-8');
            this.http.post(url,params,{
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