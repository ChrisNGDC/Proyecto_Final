import { Ingredient } from "./ingredients.model";
import { Instruction } from "./intruction.model";

export class Receta {
  id: number;
  titulo: string;
  creadaEn: Date;
  terminadaEn?: Date;
  completada: boolean;
  ingredients: Ingredient[];
  recipe: Instruction[];
  imagen: string;

  constructor(titulo: string, ingredients: Ingredient[], recipe: Instruction[], imagen: string, id?: number) {
    this.titulo = titulo;
    this.creadaEn = new Date();
    this.completada = false;
    this.ingredients = ingredients;
    this.id =  id ?? new Date().getTime();
    this.recipe = recipe;
    this.imagen = imagen;
  }
}
