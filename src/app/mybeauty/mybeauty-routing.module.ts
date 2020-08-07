import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MybeautyPage } from './mybeauty.page';

const routes: Routes = [
  {
    path: '',
    component: MybeautyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MybeautyPageRoutingModule {}
