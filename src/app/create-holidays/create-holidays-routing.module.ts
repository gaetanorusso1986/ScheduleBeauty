import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateHolidaysPage } from './create-holidays.page';

const routes: Routes = [
  {
    path: '',
    component: CreateHolidaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateHolidaysPageRoutingModule {}
