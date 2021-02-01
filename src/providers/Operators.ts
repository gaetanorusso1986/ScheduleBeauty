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
export class Operators {
    private operators:any;
    constructor(public config: Config,  public httpClient:HttpClient,public http:Http,public device:Device){
            this.operators= null;    
    }

    GetAll(FK_Beauty)
    {   
      
        return new Promise((resolve, reject)=>{       


                 var headers= new Headers();         
                 headers.append('Content-Type','application/json; charset=utf-8');
                this.http.get(Constant.GETOPERATORSBYBEAUTY+'?Fk_beauty='+FK_Beauty,{
                    headers:headers
                }).map(res=>res.json()).subscribe(data=>{
                    if(data!=null)
                    {
                    resolve(data);
                    }
                    else
                    {reject(data);}
                }, err => {
                  
                  
                  reject({message: err });
                });           
        });
    }
   

}