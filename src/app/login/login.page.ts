import { Component, OnInit } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {User} from '../../providers/user';
import {Injectable} from '@angular/core';
import { AlertUtil } from '../../app/alertUtil';
import {LoadingService} from '../LoadingService';
import {Events} from '../../service/Events'


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
              private event: Events) {
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

this.user.login(details.username, details.password).then((result)=>{

  console.log(result);
 // this.user=result;
  debugger;
  this.event.publish('user:created', result);

  this.navCtrl.navigateRoot('home');

}).catch((err)=>{
  
  var errore = JSON.parse(JSON.stringify( err));

  console.log(errore.ExceptionMessage);
  this.alertUtil.presentAlertError(errore.Message);

});
this.loadingCtrl.dismiss();
  }

  signup() {
    this.navCtrl.navigateRoot("/signup");
  }
   recovery() {
    this.navCtrl.navigateRoot("/account-recovery");
   }

}
