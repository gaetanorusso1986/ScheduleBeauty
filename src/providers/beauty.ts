import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constant from '../app/constants';




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


}