import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSocialPage } from './create-social.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSocialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSocialPageRoutingModule {}
