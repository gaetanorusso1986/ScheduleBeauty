import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateHolidaysPageRoutingModule } from './create-holidays-routing.module';

import { CreateHolidaysPage } from './create-holidays.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateHolidaysPageRoutingModule
  ],
  declarations: [CreateHolidaysPage]
})
export class CreateHolidaysPageModule {}
