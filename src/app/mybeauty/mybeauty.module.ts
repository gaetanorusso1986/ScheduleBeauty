import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MybeautyPageRoutingModule } from './mybeauty-routing.module';

import { MybeautyPage } from './mybeauty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MybeautyPageRoutingModule
  ],
  declarations: [MybeautyPage]
})
export class MybeautyPageModule {}
