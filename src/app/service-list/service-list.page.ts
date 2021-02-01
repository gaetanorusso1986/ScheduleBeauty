import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, NavController, NavParams } from '@ionic/angular';
import {Beauty} from '../../providers/beauty';
import {Availability} from  '../../providers/Availability';
import {Reservations} from  '../../providers/Reservations';
import {Injectable} from '@angular/core';
import { AlertUtil } from '../../app/alertUtil';
import {LoadingService} from '../LoadingService';
import {ActivatedRoute} from '@angular/router';
import {Service} from '../../providers/Service';

import {User} from '../../providers/user';
import { DomSanitizer } from '@angular/platform-browser';
@Injectable()
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss'],
})

export class ServiceListPage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
sliderOne: any;
id:string;
setservice:string;
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false
  };
public service_list:[];
  constructor(public navCtrl:NavController, public service:Service,public modalCtrl: ModalController, public beauty:Beauty,
    public loadingCtrl:LoadingService, private availability:Availability, public reservations: Reservations,
    private alertUtil: AlertUtil,public navParams: NavParams,public route:ActivatedRoute,
    private sanitizer: DomSanitizer,public user:User
  ){

    this.service_list=[];
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems:[]
    };
  }

  ngOnInit() {
    this.id =this.route.snapshot.paramMap.get('id');
    this.GetServicList(this.id);
  }

  BackPage()
  {
    this.id =this.route.snapshot.paramMap.get('id');
    this.navCtrl.navigateRoot(['prenotazione',{
      id: this.id
     }]);    
  }
  display(b64: string) {
    
    return this.sanitizer.bypassSecurityTrustUrl("data:image/*;base64," + b64);
  }
  GetServicList(fk_beauty)
  {
    this.loadingCtrl.present();
    this.service.getAll(fk_beauty).then((result:[])=>{
      
this.service_list= result;

this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems:result
    };
this.loadingCtrl.dismiss();  
    }).catch((err)=>{
      var errore = JSON.parse(JSON.stringify( err.message));

      console.log(errore._body);
      this.alertUtil.presentAlertError(errore._body);
    this.loadingCtrl.dismiss();  
      
    });
  }

  /***GESTIONE SLIDE ***/ 
      //Move to Next slide
      slideNext(object, slideView) {
       
        slideView.slideNext(500).then(() => {
        
          this.checkIfNavDisabled(object, slideView);
        });
      }
    
      //Move to previous slide
      slidePrev(object, slideView) {
        slideView.slidePrev(500).then(() => {
          this.checkIfNavDisabled(object, slideView);
        });;
      }
    
      //Method called when slide is changed by drag or navigation
      SlideDidChange(object, slideView) {
        
        this.checkIfNavDisabled(object, slideView);
      }
    
      //Call methods to check if slide is first or last to enable disbale navigation  
      checkIfNavDisabled(object, slideView) {
        this.checkisBeginning(object, slideView);
        this.checkisEnd(object, slideView);
      }
    
      checkisBeginning(object, slideView) {
        slideView.isBeginning().then((istrue) => {
          object.isBeginningSlide = istrue;
        });
      }
      checkisEnd(object, slideView) {
        slideView.isEnd().then((istrue) => {
          object.isEndSlide = istrue;
        });
      }
  /*** FINE ***/
  NextOperatore(){

 this.slideWithNav.getActiveIndex().then(index => {
          console.log(index);
          console.log('currentIndex:', index);
          console.log(this.sliderOne.slidesItems[index]);  
          this.setservice=this.sliderOne.slidesItems[index].Id;
       


       var object ={
         id:this.id,
         serice:this.setservice
       }
       console.log(object);
  
        this.navCtrl.navigateRoot(["operator-list",{
          
            id:this.id,
            service:this.setservice
          
         }]); 
        });
  }
}
