import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'atlas',
    loadChildren: () => import('../../atlas/atlas.module').then(m => m.AtlasModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('../../faq/faq.module').then(m => m.FAQModule)
  },
  {
    path: 'pricing',
    loadChildren: () => import('../../pricing/pricing.module').then(m => m.PricingModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../../about/about.module').then(m => m.AboutModule)
  },
  
  {
    path: 'forms',
    loadChildren: () => import('../../forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('../../tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  }
];
