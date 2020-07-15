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


@Injectable()
export class User {

    public user:any;
    public loggedIn : boolean= false;
    constructor(public config: Config,  public httpClient:HttpClient,public http:Http,public device:Device){
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
            }

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
      register(username, password, mail, businessName, vatNumber) {
    
        if (this.user) {
          return Promise.resolve(this.user);
        }
    
        var cf = '';
        var pi = vatNumber;
    
        if (vatNumber.length > 11){
          cf = vatNumber;
          pi = '';
        }
    
        return new Promise((resolve,reject) => {
          var user =  {
              'Firstname' : businessName,
              'Username' : username,
              'Email' : mail,
              'VatNumber' : pi,
              'FiscalCode' : cf,
              'Password' : Md5.hashStr(password),
              'FK_Role':'4C0FAAB8-1123-4BB9-8481-6C577BB77F4D'// <-- ID Beauty
             // 'FK_Role':'D93D01B3-3F88-4757-AC80-FBFAAC53A9E7'//<-- ID customer
              /*"TokenUser": {  
                'IDDevice': this.device.uuid
              }*/
            
          };
    
          var params = user;//JSON.stringify({user});
          console.log(params);
          var headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');
        debugger;
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
                debugger;
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
            /*user.getSession((err, session) => {
              if (err) {
                console.log('rejected session');
                reject()
              } else {
                console.log('accepted session');
                */
                //this.user = user;
                resolve()
             // }
           // });
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
          var user = { "User" : {
              'ID' : this.user.ID,
              'NewPassword' : Md5.hashStr(newPassword),
              'Password' : Md5.hashStr(oldPassword),          
              "TokenPack": {  
                'IDDevice': this.device.uuid
              }
            }
          };
    
          var params = JSON.stringify({user});
          console.log(params);
          var headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');
    
          this.http.post(Constant.CHANGE_PASSWORD,
            params, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(data => {       
                if(data.ChangePasswordResult.StatusCode == '200') {
                  this.user = data;
                  resolve();
                } else {
                  reject({message: data.ChangePasswordResult.ErrorDescription });
                }
            });
        });
      }
      recovery(email) {
    
        /*if (this.user) {
          return Promise.resolve(this.user);
        }*/
    
        return new Promise((resolve,reject) => {
          var user =  {
              'Email' : email,
              "Tokens": {  
                'IDDevice': 'B8A86AFB-4890-4E89-A8DE-9B1DB1659634'
              }
            
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
                  resolve();             

              },
              err => {
                debugger;
                console.log( + err)
                reject({message: err });
              },
              () => {        
                return false;
        
              });
        });
      }

}