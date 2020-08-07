import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSocialPage } from './update-social.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSocialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSocialPageRoutingModule {}
