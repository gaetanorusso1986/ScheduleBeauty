import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import {Social} from '../../providers/Social';
import { AlertUtil } from '../alertUtil';
import { ModalController, NavController } from '@ionic/angular';
import { CreateSocialPage } from '../create-social/create-social.page';
import { UpdateSocialPage } from '../update-social/update-social.page';
@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {

  public social:[];

  constructor(public user:User,public soc:Social, public modalCtrl: ModalController, 
    public navCtrl: NavController,private alertUtil: AlertUtil) { }

  ngOnInit() {
    this.social = [];

let fk_beauty= this.user.user.FK_Beauty;
this.getAll(fk_beauty);
  
    
  }
  ionViewWillEnter() {
    this.getAll(this.user.user.FK_Beauty);
}

  async AddSocial(){
    let Id= this.user.user.beauty.Id;
    const modal = await 
    this.modalCtrl.create({
      component: CreateSocialPage,
      componentProps: { value: Id }      
    });
    
    return await modal.present(); 
   
  }

  dismiss(fk)
  {
    
      this.modalCtrl.dismiss();         
      this.navCtrl.navigateRoot("/settings");
    
  };
   deepIndexOf(arr, obj) {
    return arr.findIndex(function (cur) {
      return Object.keys(obj).every(function (key) {
        return obj[key] === cur[key];
      });
    });
  }
  RemoveSocial(item:any){
    let p = item;
    this.alertUtil.presentConfirmRemove().then(res => {
    this.soc.remove(item.Id).then((success:any)=>{
    
      let index: number =this.deepIndexOf(this.social,item);
            if(index > -1){
          this.social.splice(index, 1);
            } 

 
     
    this.alertUtil.presentAlert(success.message);
    
    
  }).catch((err)=>{

  
   
    var errore = JSON.parse(JSON.stringify( err.message));

    console.log(errore._body);
    this.alertUtil.presentAlertError(errore._body);    
  });
  });
  
  
    }
    async updateTask(item)
    {

      const modal = await 
    this.modalCtrl.create({
      component: UpdateSocialPage,
      componentProps: { value: item }      
    });
    
    return await modal.present(); 
    }
    getAll(fk_beauty)
    {
      this.soc.getAll(fk_beauty).then((result:[])=>{
        
      this.social=result;
      }).catch((err)=>{
        
        var errore = JSON.parse(JSON.stringify( err.message));
  
        console.log(errore._body);
        this.alertUtil.presentAlertError(errore._body);    

      });

    }
    backPage(){    
      this.navCtrl.navigateRoot("settings"); 
      }

}
