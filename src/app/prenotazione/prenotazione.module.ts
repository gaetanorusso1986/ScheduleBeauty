import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrenotazionePageRoutingModule } from './prenotazione-routing.module';

import { PrenotazionePage } from './prenotazione.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrenotazionePageRoutingModule
  ],
  declarations: [PrenotazionePage]
})
export class PrenotazionePageModule {}
