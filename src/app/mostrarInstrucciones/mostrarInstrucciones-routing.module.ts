import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarInstrucciones } from './mostrarInstrucciones.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarInstrucciones
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarInstruccionesRoutingModule {}
