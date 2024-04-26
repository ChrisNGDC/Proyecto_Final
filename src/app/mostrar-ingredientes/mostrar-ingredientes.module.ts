import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarIngredientesPageRoutingModule } from './mostrar-ingredientes-routing.module';

import { MostrarIngredientesPage } from './mostrar-ingredientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarIngredientesPageRoutingModule
  ],
  declarations: [MostrarIngredientesPage]
})
export class MostrarIngredientesPageModule {}
