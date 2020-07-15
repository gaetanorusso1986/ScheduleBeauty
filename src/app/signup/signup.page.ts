import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import {User} from '../../providers/user';
import {Injectable} from '@angular/core';
import { AlertUtil } from '../../app/alertUtil';
import {LoadingService} from '../LoadingService';
import {ActivatedRoute} from '@angular/router';


export class UserDetails {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  vatNumber: string;
}

@Injectable()
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public userDetails:UserDetails;
  error: any;
  constructor(public navCtrl:NavController, public modalCtrl: ModalController, public user:User, 
              public loadingCtrl:LoadingService,
              private alertUtil: AlertUtil,public navParams: NavParams,public route:ActivatedRoute) {
                this.userDetails= new UserDetails();
               }

  ngOnInit() {
  
  
  }
  async signup() {

    this.loadingCtrl.present();
    let details = this.userDetails;
    if(!details.hasOwnProperty("username") || !details.hasOwnProperty("email") || (!details.hasOwnProperty("password") && !details.hasOwnProperty("confirmPassword")) ||
       !details.hasOwnProperty("businessName") || !details.hasOwnProperty("vatNumber")) {
      
         
      this.alertUtil.presentAlertError("Inserire tutte le informazioni");
      this.loadingCtrl.dismiss();
   
      return false;
    }

    if(details.password!=details.confirmPassword) {
      this.alertUtil.presentAlertError("Password e Conferma Password devono coincidere.");
     this.loadingCtrl.dismiss();
      return;
    }    
    if(!this.checkVatNumber(details.vatNumber)) {
      this.alertUtil.presentAlertError("Valorizzare correttamente il Codice Fiscale / P.IVA");
      this.loadingCtrl.dismiss();
      return;
    }
    this.error = null;
    console.log('register');
    
    this.user.register(details.username, details.password, details.email, details.businessName, details.vatNumber).then((result) => {
      console.log('result:', result);
    
     this.alertUtil.presentAlert("Registrazione effettuata. A breve riceverai una mail con le istruzioni per poter iniziare ad utilizzare il servizio.");
   
      this.navCtrl.navigateRoot('/login');
    }).catch((err) => { 
      debugger;
      if (err.message != "") {
        var errore = JSON.parse(JSON.stringify( err));
  var message = JSON.parse(errore.message._body);
  console.log(message.ExceptionMessage);
  this.alertUtil.presentAlertError(message.ExceptionMessage);
        //this.navCtrl.push(ConfirmPage, { 'username': details.username });
      }            
    });
    this.loadingCtrl.dismiss();
  }

  login() {
    this.navCtrl.navigateRoot("/login");
  }

  checkVatNumber(vatNumber){
    var codiceFiscale = /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/;
    var partitaIVA = /^[0-9]{11}$/;

    if (vatNumber.length > 11)
      return codiceFiscale.test(vatNumber);
    else
      return partitaIVA.test(vatNumber);
  }

}
