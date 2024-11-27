import { ProdutoDeleteComponent } from './components/produto/produto-delete/produto-delete.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { Routes } from '@angular/router';
import { CategoriaReadComponent } from './components/categoria/categoria-read/categoria-read.component';
import { CategoriaCreateComponent } from './components/categoria/categoria-create/categoria-create.component';
import { CategoriaUpdateComponent } from './components/categoria/categoria-update/categoria-update.component';
import { CategoriaDeleteComponent } from './components/categoria/categoria-delete/categoria-delete.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/categoria',
    pathMatch: 'full',
  },

  {
    path: 'categoria',
    component: CategoriaReadComponent,
  },

  {
    path: 'categoria/create',
    component: CategoriaCreateComponent,
  },

  {
    path: 'categoria/update/:id',
    component: CategoriaUpdateComponent,
  },

  {
    path: 'categoria/delete/:id',
    component: CategoriaDeleteComponent,
  },

  {
    path: 'produto',
    loadComponent: () =>
      import('./components/produto/produto-read/produto-read.component').then(
        (m) => m.ProdutoReadComponent
      ),
  },

  {
    path: 'produto/create',
    loadComponent: () =>
      import(
        './components/produto/produto-create/produto-create.component'
      ).then((m) => m.ProdutoCreateComponent),
  },

  {
    path: 'produto/update/:id',
    loadComponent: () =>
      import(
        './components/produto/produto-update/produto-update.component'
      ).then((m) => m.ProdutoUpdateComponent),
  },

  {
    path: 'produto/delete/:id',
    loadComponent: () =>
      import(
        './components/produto/produto-delete/produto-delete.component'
      ).then((m) => m.ProdutoDeleteComponent),
  },
];
