import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperatorListPage } from './operator-list.page';

const routes: Routes = [
  {
    path: '',
    component: OperatorListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorListPageRoutingModule {}
