import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecetasComponent } from './recetas/recetas.component';



@NgModule({
  declarations: [
    RecetasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    RecetasComponent
  ]
})
export class ComponentsModule { }
