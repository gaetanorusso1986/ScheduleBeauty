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
import {Operators} from '../../providers/Operators';

@Injectable()
@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.page.html',
  styleUrls: ['./operator-list.page.scss'],
})
// export class Reservation {
//   id: string;
//   service: string;
//   confirmPassword: string;    
// }
export class OperatorListPage implements OnInit {
  id:string;
  idservice:string;
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any;
  
  setoperator:string;
    //Configuration for each Slider
    slideOptsOne = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay: false
    };
    public operator_list:[];
  constructor(public navCtrl:NavController, public service:Service,public modalCtrl: ModalController, public beauty:Beauty,
    public loadingCtrl:LoadingService, private availability:Availability, public reservations: Reservations,
    private alertUtil: AlertUtil,public navParams: NavParams,public route:ActivatedRoute,
    private oper: Operators
   
  ) { 
    this.operator_list=[];
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems:[]
    };
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idservice=this.route.snapshot.paramMap.get('service');   
    this.GetServicList(this.id);    
    }

    GetServicList(fk_beauty)
    {
      this.loadingCtrl.present();
      this.oper.GetAll(fk_beauty).then((result:[])=>{
        
      this.operator_list= result;
  
  this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems:result
      };
  this.loadingCtrl.dismiss();  
      }).catch((err)=>{
        var errore = JSON.parse(JSON.stringify( err.message));
  
        
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
  NextPrenota(){
    this.slideWithNav.getActiveIndex().then(index => {
    this.setoperator=this.sliderOne.slidesItems[index].Id;
         
           this.navCtrl.navigateRoot(["calendar",{             
               id:this.id,
               service:this.idservice,
               operator:this.setoperator             
            }]); 
           });
     }

  BackPage()
  {
    this.id =this.route.snapshot.paramMap.get('id');  
    this.navCtrl.navigateRoot(['service-list',{
      id: this.id
     }]);    
    }
  

}
