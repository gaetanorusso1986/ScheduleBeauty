import { Component, OnInit } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {Beauty} from '../../providers/beauty';
import {Injectable} from '@angular/core';
import { AlertUtil } from '../../app/alertUtil';
import {ActivatedRoute} from '@angular/router';
import {LoadingService} from '../LoadingService';



@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  public beautyList: any;
  public selectedLeave;
  constructor(public navCtrl:NavController, public modalCtrl: ModalController, public beauty:Beauty, 
    public loadingCtrl:LoadingService,
    private alertUtil: AlertUtil,
    public route:ActivatedRoute) {
      
     }

  ngOnInit() {

this.selectedLeave='';
  this.getAllBeauty();
  }


  getAllBeauty()
  {

    this.beauty.GetAll().then((result)=>{
      
      this.beautyList=result;
      console.log(result);
    }).catch((err)=>{
    
      var errore = JSON.parse(JSON.stringify( err));
    
      console.log(errore.ExceptionMessage);
      this.alertUtil.presentAlertError(errore.Message);
    
    });
  }
  
  filterItems(searchTerm) {
    return this.beautyList.filter(item => {
      return item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  Details(id)
  {

     this.beauty.GetDetails(id).then((result)=>{
      
      this.navCtrl.navigateRoot(["beauty-details",{
         id: id
        }]);;
    //  this.navCtrl.navigateRoot("/signup");

     }).catch((err)=>{
    
      var errore = JSON.parse(JSON.stringify( err));
    
      console.log(errore.ExceptionMessage);
      this.alertUtil.presentAlertError(errore.Message);
    
    });

  }
}
