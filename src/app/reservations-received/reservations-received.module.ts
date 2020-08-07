import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsReceivedPageRoutingModule } from './reservations-received-routing.module';

import { ReservationsReceivedPage } from './reservations-received.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationsReceivedPageRoutingModule
  ],
  declarations: [ReservationsReceivedPage]
})
export class ReservationsReceivedPageModule {}
