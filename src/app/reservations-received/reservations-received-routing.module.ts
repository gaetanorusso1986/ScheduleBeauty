import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationsReceivedPage } from './reservations-received.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationsReceivedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsReceivedPageRoutingModule {}
