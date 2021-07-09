import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirmLevelModelsComponent } from './firm-level-models.component';

const routes: Routes = [
    {
        path: '',
        component: FirmLevelModelsComponent,
        data: {
            title: 'Firm level models'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FirmLevelModelsRoutingModule {
}
