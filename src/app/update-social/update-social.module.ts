import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSocialPageRoutingModule } from './update-social-routing.module';

import { UpdateSocialPage } from './update-social.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSocialPageRoutingModule
  ],
  declarations: [UpdateSocialPage]
})
export class UpdateSocialPageModule {}
