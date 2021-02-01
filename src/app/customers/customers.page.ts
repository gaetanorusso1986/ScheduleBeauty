import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import {User} from '../../providers/user';
import { AlertUtil } from '../alertUtil';
import { LoadingService } from '../LoadingService';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
public list:[];
  constructor(public navCtrl:NavController,private user : User,public loadingCtrl:LoadingService,    private alertUtil: AlertUtil,private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.list=[];
    this.GetAllCustomersById();
    
  }
  GetAllCustomersById()
{
  this.loadingCtrl.present();
this.user.getCustomersById(this.user.user.Id).then((res:[])=>{
  this.list= res;
  this.loadingCtrl.dismiss();
}).catch((err)=>{
  this.loadingCtrl.dismiss();
  this.alertUtil.presentAlertError("Si è verificato un problema, riprova più tardi");

})

}
display(b64: string) {
  
  return this.sanitizer.bypassSecurityTrustUrl("data:image/*;base64," + b64);
}

Details(id, isactive,idUser)
{         
    this.navCtrl.navigateRoot(["beauty-details",{
       id: id,
       active:isactive, 
       idUser:idUser
      }]);
}
}
