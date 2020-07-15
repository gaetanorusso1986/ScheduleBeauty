import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeautyDetailsPage } from './beauty-details.page';

const routes: Routes = [
  {
    path: '',
    component: BeautyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeautyDetailsPageRoutingModule {}
