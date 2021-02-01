import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitaClientiPage } from './invita-clienti.page';

const routes: Routes = [
  {
    path: '',
    component: InvitaClientiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitaClientiPageRoutingModule {}
