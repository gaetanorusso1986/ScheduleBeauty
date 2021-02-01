import { Component, OnInit } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {Beauty} from '../../providers/beauty';
import {Injectable} from '@angular/core';
import { AlertUtil } from '../../app/alertUtil';
import {ActivatedRoute} from '@angular/router';
import {LoadingService} from '../LoadingService';
import { DomSanitizer } from '@angular/platform-browser';



@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  public beautyList: any;
  public defaultList: any;
  public selectedLeave;
  constructor(public navCtrl:NavController, public modalCtrl: ModalController, public beauty:Beauty, 
    public loadingCtrl:LoadingService,
    private alertUtil: AlertUtil,
    public route:ActivatedRoute, private sanitizer: DomSanitizer) {
      
     }

  ngOnInit() {

this.selectedLeave='';
  this.getAllBeauty();

  }


  getAllBeauty()
  {

    
    //this.loadingCtrl.present();
    this.beauty.GetAll().then((result)=>{
      
      //this.beautyList=result;
      console.log(result);
      this.defaultList=result;      
      //this.loadingCtrl.dismiss();
    }).catch((err)=>{
      //this.loadingCtrl.dismiss();
      var errore = JSON.parse(JSON.stringify( err));  
       this.alertUtil.presentAlertError("Impossibile visualizzare la lista dei barbieri, riprova più tardi");

    }).finally(()=>{
      
      this.loadingCtrl.dismiss();

    });
  }
  
  filterItems(searchTerm) {
    
    this.resetChanges();
    if (!searchTerm) {
      return;
    }
    
    this.beautyList= this.defaultList.filter(item => {
      
      if (item.Name && searchTerm) {
        
      return item.Name.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1;
      }
    });
  }
  protected resetChanges = () => {

    this.beautyList = [];
};
display(b64: string) {
  return this.sanitizer.bypassSecurityTrustUrl("data:image/*;base64," + b64);
}
  Details(id)
  {         
      this.navCtrl.navigateRoot(["prenotazione",{
         id: id
        }]);
  }
}
