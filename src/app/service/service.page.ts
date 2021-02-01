import { Component, OnInit } from '@angular/core';
import { CreateServicePage } from '../create-service/create-service.page';
import { User } from 'src/providers/user';
import { Social } from 'src/providers/Social';
import { ModalController, NavController } from '@ionic/angular';
import { AlertUtil } from '../alertUtil';
import {Service} from '../../providers/Service';
import { UpdateSocialPage } from '../update-social/update-social.page';
import { UpdateServicePage } from '../update-service/update-service.page';
import { LoadingService } from '../LoadingService';
@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
public service_list:[];
  constructor(public user:User,public service:Service, public modalCtrl: ModalController, 
    public navCtrl: NavController, public loadingCtrl:LoadingService,private alertUtil: AlertUtil) { 
      this.service_list=[];
    }

  ngOnInit() {
    let fk_beauty= this.user.user.FK_Beauty;
this.getall(fk_beauty);
  }
  backPage(){    
    this.navCtrl.navigateRoot("settings"); 
    }
 
  async AddService(){
    
    if(this.user.user.beauty==null)
    {
      this.alertUtil.presentAlertError("Prima di inserire i servizi, inserisci la tua attività");
      return;
    }
    let Id= this.user.user.beauty.Id;
    const modal = await 
    this.modalCtrl.create({
      component: CreateServicePage,
      componentProps: { value: Id }      
    });
    modal.onDidDismiss().then((data) => {
      let fk_beauty= this.user.user.FK_Beauty;
     this.getall(fk_beauty);
  });
    
    return await modal.present(); 
   
  }
  async updateTask(item){
    let Id= item.Id
    const modal = await 
    this.modalCtrl.create({
      component: UpdateServicePage,
      componentProps: { value: Id }      
    });
    
    modal.onDidDismiss().then((data) => {
      let fk_beauty= this.user.user.FK_Beauty;
     this.getall(fk_beauty);
  });
    return await modal.present(); 
   
  }
  deepIndexOf(arr, obj) {
    return arr.findIndex(function (cur) {
      return Object.keys(obj).every(function (key) {
        return obj[key] === cur[key];
      });
    });
  }

  getall(fk_beauty)
  {
this.loadingCtrl.present();
    this.service.getAll(fk_beauty).then((result:[])=>{
this.service_list= result;
this.loadingCtrl.dismiss();  
    }).catch((err)=>{
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
      this.alertUtil.presentAlertError(errore._body);
    this.loadingCtrl.dismiss();  
      
    });
  }


}
