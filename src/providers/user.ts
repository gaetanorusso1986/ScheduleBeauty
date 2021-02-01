import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx'

import { Md5 } from 'ts-md5/dist/md5';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constant from '../app/constants';
import { JsonPipe } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
//import { NativeStorage } from '@ionic-native
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { rejects } from 'assert';

@Injectable()
export class User {

    public user:any;
    public loggedIn : boolean= false;
    constructor(public config: Config,  
      public httpClient:HttpClient,
      public http:Http,public device:Device, private nativeStorage: NativeStorage){
            //this.user= null;    
    }


    getUser(){

        return this.user;
    }
    login(username, password)
    {
      
        if(this.user)
        {
            return Promise.resolve(this.user);
        }
      
        return new Promise((resolve, reject)=>{
           
            var user ={
              'Email':username,
              'Password': Md5.hashStr(password)
              //'Token':this.device.uuid //<--- Gestion Token da implementare
      };
           var params = JSON.stringify(user);        
            console.log(params);      
        

                 var headers= new Headers();         
                 headers.append('Content-Type','application/json; charset=utf-8');
                this.http.post(Constant.LOGIN,
                params,{
                    headers:headers
                }).map(res=>res.json()).subscribe(data=>{
                    if(data!=null)
                    {
                    this.user=data;
                    console.log("User" + data);
                    this.nativeStorage.setItem('user', {property: data})
                    .then(
                      () => console.log('Stored item!'),
                      error => console.error('Error storing item', error)
                    );
                    
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
    logout() {
        this.user = null;
        // TODO: disconnect online
      
      }
      register(username, password, mail, businessName, vatNumber,isChecked) {
    
        if (this.user) {
          return Promise.resolve(this.user);
        }
    
        var cf = '';
        var pi = vatNumber;
        var role='';
      
        if (vatNumber!=undefined && vatNumber.length > 11){
          cf = vatNumber;
          pi = '';
        }
        if(isChecked)
        {
        role='31FDD82C-F51D-4B42-9BCC-6B68B9466BCF';
        }
        else
        {role='331726A4-B1BE-422A-ACBA-F775078C6CEA';}
        return new Promise((resolve,reject) => {
          var user =  {
              'Firstname' : businessName,
              'Username' : username,
              'Email' : mail,
              'VatNumber' : pi,
              'FiscalCode' : cf,
              'BussinessName':businessName,
              'Password' : Md5.hashStr(password),
              'FK_Role':role
              
              /*"TokenUser": {  
                'IDDevice': this.device.uuid
              }*/
            
          };
    
          var params = user;//JSON.stringify({user});
          console.log(params);
          var headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');
        
          this.http.post(Constant.REGISTER,
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
       
        
      
      isAuthenticated() {
    
        return new Promise((resolve, reject) => {
          
          // TODO: vedere se la sessione dell'utente è ancora attiva
          //let user = this.cognito.getCurrentUser();
          let user = this.user;
          
          if (user != null) {
            this.nativeStorage.getItem('user')
            .then(
            data => user=data,
            error => console.error(error)
             );
            this.user = user;
                resolve(this.user)
           
          } else {
            reject()
          }
        });
      }
      changePassword(oldPassword, newPassword) {
    
        //if (this.user) {
        //  return Promise.resolve(this.user);
        //}
    
        return new Promise((resolve,reject) => {
         
          var user = {
              'Id' : this.user.Id,
              'Password' : Md5.hashStr(newPassword),
              'OldPassword' : Md5.hashStr(oldPassword),         
              /*"TokenPack": {  
                'IDDevice': this.device.uuid
              }*/
            
          };
    
          var params = user;//JSON.stringify({user});
          console.log(params);
          var headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');
          
          this.http.post(Constant.CHANGE_PASSWORD,
            params, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(data => {       
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
      recovery(email) {
    
        /*if (this.user) {
          return Promise.resolve(this.user);
        }*/
    
        return new Promise((resolve,reject) => {
          var user =  {
            'Email' : email
              // ,
              // "Tokens": {  
              //   'IDDevice': 'B8A86AFB-4890-4E89-A8DE-9B1DB1659634'
              // }
            
          };
          var params =user;// JSON.stringify({user});
          console.log(params);
          var headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');
    
          this.http.post(Constant.RECOVERY,
            params, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
              data => {            
                console.log( + data)
                  resolve(data);             

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

      updateUser(userUpdate)
      {     
        return new Promise((resolve,reject) => {        
    
          var params = userUpdate;
          
          var headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');
        
          this.http.post(Constant.UPDATEUSER,
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

      getCustomersById(id)
      {
        return new Promise((resolve,reject)=>{

          var params ={
            'Id':id
          };

          
          var headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');
          this.http.post(Constant.GETCUSTOMERS,
            params, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
              data => {       
                  resolve(data);       
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

      ActiveUserFromAdmin(id, isactive)
      {
        return new Promise((resolve,reject)=>{
        var params ={
          'Id':id,
          'IsActive':isactive
        };

        
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        this.http.post(Constant.CONFIRMUSER,
          params, {
              headers: headers
          })
          .map(res => res.json())
          .subscribe(
            data => {       
                resolve(data);       
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
      InvitaCliente(email)
      {
          return new Promise((resolve, reject)=>{    
            debugger;    
  var params = {
    'Email':email,
    'FK_User': this.user.Id
  };
  
              var headers= new Headers();         
              headers.append('Content-Type','application/json; charset=utf-8');
             this.http.post(Constant.INVITOUSER,
              params,
              {
                 headers:headers 
              }
                 ).map(res=>res.text()).subscribe(data=>{
                 
                 resolve(data);
                 
             }, err => {
               console.log( + err)
               
               reject({message: err });
             });
        
     });
  
      }

}