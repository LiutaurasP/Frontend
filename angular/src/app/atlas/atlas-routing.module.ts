import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtlasComponent } from './atlas.component';

const routes: Routes = [
  {
    path: '',
    component: AtlasComponent,
    data: {
      title: 'Atlas'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtlasRoutingModule { }
