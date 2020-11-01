import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpectrumComponent } from "./spectrum.component";

const routes: Routes = [
  {
    path: '',
    component: SpectrumComponent,
    data: {
        title: 'Spectrum Page'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpectrumRoutingModule { }
