import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertUtil {

    private message: any;

  constructor(private alertCtrl: AlertController) {   
      this.message = null;
  }


async presentAlertError(message) {
    const alert = await this.alertCtrl.create({
        header: 'Attenzione',
        subHeader: message,
      buttons: ['OK']
    });
    await alert.present(); 
  }

async  presentConfirmRemove() : Promise<any> {
  return new Promise(async (resolve) => {
    let alert = this.alertCtrl.create({
      header: "Attenzione",
      message: "Confermi l'eliminazione ? ",
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'OK',
          handler: () => {
            resolve("OK");
          }
        }
      ]
    });
    await (await alert).present();
  });
}


  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
        header: 'Notifica',
        subHeader: message,
      buttons: ['OK']
    });
    await alert.present(); 
  }
}
