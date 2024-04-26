import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mostrar-ingredientes/:idReceta',
    loadChildren: () => import('./mostrar-ingredientes/mostrar-ingredientes.module').then( m => m.MostrarIngredientesPageModule)
  },
  {
    path: 'mostrarInstrucciones/:idReceta',
    loadChildren: () => import('./mostrarInstrucciones/mostrarInstrucciones.module').then( m => m.MostrarInstruccionesModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
