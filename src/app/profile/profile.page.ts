import { Component, OnInit } from '@angular/core';
import {User} from '../../providers/user';
import { ModalController, NavController } from '@ionic/angular';

import { MyprofilePage } from '../myprofile/myprofile.page';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile:any;
  constructor(private user:User,
    public modalCtrl: ModalController,
    public navCtrl:NavController) { }

  ngOnInit() {
    this.profile=this.user.getUser();
    console.log(this.profile);
  }

  
  Beauty(profile){
    this.navCtrl.navigateRoot(["mybeauty",{
      idbeauty: JSON.stringify(profile.beauty.Id)
     }]);
      console.log(profile.Beauty);
  }
  
  async EditProfile(profile){
    const modal = await this.modalCtrl.create({
      component: MyprofilePage,
      componentProps: { value: profile }      
    });
    return await modal.present();  
  }

}
