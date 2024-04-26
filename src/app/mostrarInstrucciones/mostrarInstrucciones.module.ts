import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarInstruccionesRoutingModule } from './mostrarInstrucciones-routing.module';

import { MostrarInstrucciones } from './mostrarInstrucciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarInstruccionesRoutingModule
  ],
  declarations: [MostrarInstrucciones]
})
export class MostrarInstruccionesModule {}
