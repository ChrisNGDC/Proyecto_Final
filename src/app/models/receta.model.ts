import { Ingredient } from "./ingredients.model";

export class Receta {
  id: number;
  titulo: string;
  creadaEn: Date;
  terminadaEn?: Date;
  completada: boolean;
  ingredients: Ingredient[];
  recipe: string;

  constructor(titulo: string) {
    this.titulo = titulo;
    this.creadaEn = new Date();
    this.completada = false;
    this.ingredients = [new Ingredient("Ingredient1", "0")];
    this.id = new Date().getTime();
    this.recipe = 'Receta aca...';
  }
}
