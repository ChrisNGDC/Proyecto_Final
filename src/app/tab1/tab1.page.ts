import { Component } from '@angular/core';
import { BaseRecetasService } from '../services/base-recetas.service';
import { Receta } from '../models/receta.model';
import { Ingredient } from '../models/ingredients.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  recetasAPI: any[] = [];
  cantidadRecetas = 5;
  constructor(public baseRecetas: BaseRecetasService) {}
  ngOnInit() {
    this.ionViewDidLoad();
  }
  ionViewDidLoad() {
    this.getRecetas()
  }
  getRecetas() {
    this.recetasAPI = []
    for (let i = 0; i < this.cantidadRecetas; i++) {
      this.baseRecetas.obtenerReceta().subscribe({
        next: (data) => this.recetasAPI.push(data),
        error: (error) => console.log(error),
      });
    }
  }
  guardarReceta(unaReceta: any) {
    let ingredientes = []
    let numeroIngrediente = 1
    do {
      let ingrediente = new Ingredient(unaReceta[`strIngredient${numeroIngrediente}`], unaReceta[`strMeasure${numeroIngrediente}`]);
      if (ingrediente.name == '' || ingrediente.amount == '') {
        break;
      }
      ingredientes.push(ingrediente);
      numeroIngrediente++
    } while (true)
    const receta = new Receta(unaReceta.strMeal, ingredientes, unaReceta.strInstructions.split('.'))
    receta.id = unaReceta.idMeal
    console.log(receta);
  }
}
