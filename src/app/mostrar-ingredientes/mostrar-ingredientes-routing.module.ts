import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarIngredientesPage } from './mostrar-ingredientes.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarIngredientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarIngredientesPageRoutingModule {}
