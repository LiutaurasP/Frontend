import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefreshesComponent } from "./refreshes.component";

const routes: Routes = [
  {
    path: '',
    component: RefreshesComponent,
    data: {
        title: 'Refreshes Page'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RefreshesRoutingModule { }
