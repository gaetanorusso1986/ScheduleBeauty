import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSocialPageRoutingModule } from './create-social-routing.module';

import { CreateSocialPage } from './create-social.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSocialPageRoutingModule
  ],
  declarations: [CreateSocialPage]
})
export class CreateSocialPageModule {}
