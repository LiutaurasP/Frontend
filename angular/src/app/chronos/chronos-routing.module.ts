import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChronosComponent } from "./chronos.component";

const routes: Routes = [
  {
    path: '',
    component: ChronosComponent,
    data: {
        title: 'Chronos Page'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChronosRoutingModule { }
