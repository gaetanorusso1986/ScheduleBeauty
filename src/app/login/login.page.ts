import { Component, OnInit } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {User} from '../../providers/user';
import {Injectable} from '@angular/core';
import { AlertUtil } from '../../app/alertUtil';
import {LoadingService} from '../LoadingService';
import {Events} from '../../service/Events'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


export class LoginDetails{
username:string;
password:string;
}
@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    
  public loginDetails:LoginDetails;

  constructor(public navCtrl:NavController, public modalCtrl: ModalController, public user:User, 
              public loadingCtrl:LoadingService,
              private alertUtil: AlertUtil,
              private event: Events
             ) {
                this.loginDetails= new LoginDetails();
               }

  ngOnInit() {
  }
 login(){
let details=this.loginDetails;
this.loadingCtrl.present();
if(!details.hasOwnProperty("username") || !details.hasOwnProperty("password")) {

  this.alertUtil.presentAlertError("Inserire tutte le informazioni");
  this.loadingCtrl.dismiss();
  return false;
}
// details.username="test@test.it";
// details.password="b";
if(!this.checkMail(details.username))
{    
  this.loadingCtrl.dismiss();
  this.alertUtil.presentAlertError("Email non corretta"); 
   return false;

}
this.user.login(details.username, details.password).then((result)=>{

  this.loadingCtrl.dismiss();
 
  this.user.user=result;

  this.event.publish('user:created', result);

  this.navCtrl.navigateRoot('home');
  
}).catch((err)=>{
  
  var errore = JSON.parse(JSON.stringify( err.message));

  console.log(errore._body);
  this.alertUtil.presentAlertError(errore._body);
  this.loadingCtrl.dismiss();
});

  }

  signup() {
    this.navCtrl.navigateRoot("/signup");
  }
   recovery() {
    this.navCtrl.navigateRoot("/account-recovery");
   }
   checkMail(email){    
    var check = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
    return check.test(email);
  }

}
