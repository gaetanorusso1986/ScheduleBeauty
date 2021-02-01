import { Component, OnInit } from '@angular/core';
import {User} from '../../providers/user';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  profile:any;
  constructor(private user:User,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public navCtrl:NavController) { }

  ngOnInit() {    
    this.profile=this.navParams.data.value;
  }
  
 
  update(){
 
  this.user.updateUser(this.profile).then((result) => {
    console.log(result);
  }).catch((err)=>{
    //this.loadingCtrl.dismiss();
    var errore = JSON.parse(JSON.stringify( err.message));

   
   // this.alertUtil.presentAlertError(errore._body);    
  });
 
  }



  closeModal()
  {
    this.modalCtrl.dismiss();
  }
  UpdatePassword(){
    this.closeModal();
    this.navCtrl.navigateRoot("/changepassword");
  } 
  
}
