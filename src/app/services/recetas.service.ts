import { Injectable } from '@angular/core';
import { Receta } from '../models/receta.model';
import { AlertController, ToastController } from '@ionic/angular';
import { Instruction } from '../models/intruction.model';
import { Ingredient } from '../models/ingredients.model';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  public recetas: Receta[] = [];
  constructor(
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.cargarStorage();
  }
  crearReceta(nombreReceta: string, ingredientes: Ingredient[], instrucciones: Instruction[]) {
    console.log(nombreReceta);
    console.log(ingredientes);
    console.log(instrucciones);
    let ObjetoReceta = new Receta(nombreReceta, ingredientes, instrucciones);
    this.recetas.push(ObjetoReceta);
    this.guardarStorage();
    return ObjetoReceta.titulo;
  }
  guardarStorage() {
    let stringRecetas: string = JSON.stringify(this.recetas);
    localStorage.setItem('Recetas', stringRecetas);
  }
  cargarStorage() {
    const recetasStorage = localStorage.getItem('Recetas');
    if (recetasStorage === null) {
      return (this.recetas = []);
    } else {
      let objLista = JSON.parse(recetasStorage);
      return (this.recetas = objLista);
    }
  }
  eliminarReceta(receta: Receta) {
    let nuevoSave = this.recetas.filter(
      (unaReceta) => unaReceta.id !== receta.id
    );

    this.recetas = nuevoSave;
    this.guardarStorage();
  }
  editarReceta(receta: Receta) {
    let recetaEditar = this.recetas.find(
      (unaReceta) => unaReceta.id == receta.id
    );
    if (recetaEditar) {
      recetaEditar.titulo = receta.titulo;
    }

    this.guardarStorage();
  }
  validarInput(input: any): boolean {
    for (const key in input) {
      if (input[key] == '') {
        this.presentToast('Debe ingresar un valor');
        return false;
      }
    }
    return true;
    
  }
  async presentToast(mensage: string) {
    let toast = await this.toastController.create({
      message: mensage,
      duration: 2000,
    });
    toast.present();
  }
  obtenerReceta(idReceta: string | number) {
    const id = Number(idReceta);
    let receta = this.recetas.find((unaReceta)=> unaReceta.id == id);
    return receta;
   }
   
}
