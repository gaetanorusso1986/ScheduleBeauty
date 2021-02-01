import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitaClientiPageRoutingModule } from './invita-clienti-routing.module';

import { InvitaClientiPage } from './invita-clienti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitaClientiPageRoutingModule
  ],
  declarations: [InvitaClientiPage]
})
export class InvitaClientiPageModule {}
