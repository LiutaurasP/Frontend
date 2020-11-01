import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'atlas',
    loadChildren: () => import('../../atlas/atlas.module').then(m => m.AtlasModule)
  },
//  {
//    path: 'faq',
//    loadChildren: () => import('../../faq/faq.module').then(m => m.FAQModule)
//  },
//  {
//    path: 'support',
//    loadChildren: () => import('../../pricing/pricing.module').then(m => m.PricingModule)
//  },
  {
    path: 'about',
    loadChildren: () => import('../../about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'spectrum',
    loadChildren: () => import('../../spectrum/spectrum.module').then(m => m.SpectrumModule)
  },
  {
    path: 'oracle',
    loadChildren: () => import('../../oracle/oracle.module').then(m => m.OracleModule)
  },
  {
    path: 'chronos',
    loadChildren: () => import('../../chronos/chronos.module').then(m => m.ChronosModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  }
];
