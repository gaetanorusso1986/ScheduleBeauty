import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperatorListPageRoutingModule } from './operator-list-routing.module';

import { OperatorListPage } from './operator-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperatorListPageRoutingModule
  ],
  declarations: [OperatorListPage]
})
export class OperatorListPageModule {}
