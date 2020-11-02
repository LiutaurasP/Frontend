import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BenedettoComponent } from "./benedetto.component";

const routes: Routes = [
  {
    path: '',
    component: BenedettoComponent,
    data: {
        title: 'Benedetto Page'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BenedettoRoutingModule { }
