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
export class Social {
    private social:any;
    constructor(public config: Config,  public httpClient:HttpClient,public http:Http,public device:Device){
            this.social= null;    
    }

    Save(social, description,fk_beauty)
    {
        return new Promise((resolve,reject) => {
            
            var item =  {
               "Name": social,
               "Description": description,
                "FK_Beauty": fk_beauty
            }
            var headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=utf-8');
            var params = item;
            console.log(params);
            this.http.post(Constant.SOCIAL,
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
            this.http.post(Constant.REMOVE_SOCIAL,
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
  
    getAll(FK_Beauty){

      return new Promise((resolve, reject)=>{        

        var item =  {
          "FK_Beauty":FK_Beauty
          }
          var params = item;
        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
        this.http.post(Constant.GETALL_SOCIAL,
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
    updateSocial(social)
    {
      return new Promise((resolve,reject) => {
            
        var item =  {
          "Id":social.Id,
           "Name": social.Name,
           "Description":social.Description,
            "FK_Beauty": social.FK_Beauty
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var params = item;
        console.log(params);
        this.http.post(Constant.UPDATE_SOCIAL,
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