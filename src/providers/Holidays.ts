import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constant from '../app/constants';




@Injectable()
export class Holidays {
    private holidays:any;
    constructor(public config: Config,  public httpClient:HttpClient,public http:Http,public device:Device){
        this.holidays= null;    
}
GetAll(FK_beauty){

    var model ={
    
        
        'FK_Beauty':FK_beauty 
    }

var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{        


        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
       this.http.post(Constant.GETALL_HOLIDAY,params,{
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
GetSingle(FK_beauty){

    var model ={
    
        
        'FK_Beauty':FK_beauty 
    }

var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{        


        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
       this.http.post(Constant.GETALL_HOLIDAY,params,{
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

SearchDay(Date){

    var model ={
        'Date':Date 
        }

var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{        


        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
       this.http.post(Constant.SEARCHDAY_HOLIDAY,params,{
           headers:headers
       }).map(res=>res.json()).subscribe(data=>{
           if(data!=null)
           {
            resolve(data);
           }
           else
           {
            reject(data);
            }
       }, err => {
         console.log( + err);         
         reject({message: err });
       });
  
});

}

Update(item){

    var model ={
    
        'Id':item.Id,
        'Date':item.Date,
        "Description":item.Description,
        'HourFrom':item.HourFrom,
        'HourTo':item.HourTo,
        'FK_Service':item.FK_Service 
    }
    var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{    
        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
        this.http.post(Constant.UPDATE_HOLIDAY,params,{
        headers:headers
        }).map(res=>res.json()).subscribe(data=>{
          
           resolve(data);
         
          
       }, err => {
         console.log( + err)
         
         reject({message: err });
       });
  
});

}
Save(item)
{
    var model ={
    
        'Id':item.Id,
        'Date':item.Date,
        "Description":item.Description,
        'HourFrom':item.HourFrom,
        'HourTo':item.HourTo,
        'FK_Service':item.FK_Service 
    }
    var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{    
        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
        this.http.post(Constant.HOLIDAYS,params,{
        headers:headers
        }).map(res=>res.json()).subscribe(data=>{
          
           resolve(data);
         
          
       }, err => {
         console.log( + err)
         
         reject({message: err });
       });
  
});


}

Delete(item)
{
    var model ={
    
        'Id':item.Id}

        var params = JSON.stringify(model);   
        return new Promise((resolve, reject)=>{    
            var headers= new Headers();         
            headers.append('Content-Type','application/json; charset=utf-8');
            this.http.post(Constant.REMOVE_HOLIDAY,params,{
            headers:headers
            }).map(res=>res.json()).subscribe(data=>{
              
               resolve(data);
             
              
           }, err => {
             console.log( + err)
             
             reject({message: err });
           });
        });
    
}

GetSingleByFk(Id,FK_Service){

    var model ={
    
        'Id':Id,
        'FK_Service':FK_Service 
    }

var params = JSON.stringify(model);   
    return new Promise((resolve, reject)=>{    
        var headers= new Headers();         
        headers.append('Content-Type','application/json; charset=utf-8');
        this.http.post(Constant.GETSINGLEBYFK_HOLIDAY,params,{
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