import { Component } from '@angular/core';
import { BaseRecetasService } from '../services/base-recetas.service';
import { RecetasService } from '../services/recetas.service';
import { Ingredient } from '../models/ingredients.model';
import { Instruction } from '../models/intruction.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  recetasAPI: any[] = [];
  cantidadRecetas = 9;
  isActive: boolean = false;
  constructor(
    public baseRecetas: BaseRecetasService,
    public recetasService: RecetasService
  ) {}
  ngOnInit() {
    this.ionViewDidLoad();
  }
  ionViewDidLoad() {
    this.getRecetas();
  }
  getRecetas() {
    this.recetasAPI = [];
    for (let i = 0; i < this.cantidadRecetas; i++) {
      this.baseRecetas.obtenerReceta().subscribe({
        next: (data) => this.recetasAPI.push(data),
        error: (error) => console.log(error.statusText),
      });
    }
    console.log(this.recetasAPI);
  }
  async AgregarReceta(nombre: string, ingredientes: Ingredient[], instrucciones: Instruction[], imagen: string) {
    let creadaOk = this.recetasService.crearReceta(nombre, ingredientes, instrucciones, imagen);
    if (creadaOk) {
      this.recetasService.presentToast('Receta guardada correctamente!');
    }
  }
  guardarReceta(unaReceta: any) {
    let ingredientes = [];
    let instrucciones: Instruction[] = [];
    let numeroIngrediente = 1;
    let imagen: string = '';
    do {
      let ingrediente = new Ingredient(
        unaReceta[`strIngredient${numeroIngrediente}`],
        unaReceta[`strMeasure${numeroIngrediente}`]
      );
      if (ingrediente.name == '' || ingrediente.amount == '') {
        break;
      }
      ingredientes.push(ingrediente);
      numeroIngrediente++;
    } while (true);
    let nombre: string = unaReceta.strMeal;
    let instruccionesStr: string[] = unaReceta.strInstructions.split('.');
    instruccionesStr.splice(-1, 1);
    instruccionesStr.forEach((instruccionStr) => {
      let instruccion = new Instruction(instruccionStr, false);
      instrucciones.push(instruccion);
    });
    unaReceta.favorite = true;
    this.AgregarReceta(nombre, ingredientes, instrucciones, imagen);
  }
}
