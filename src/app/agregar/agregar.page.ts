import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetasService } from '../services/recetas.service';
import { Receta } from '../models/receta.model';
import { Ingredient } from '../models/ingredients.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  receta: Receta;
  nombreIngredient: string;
  amountIngredient: string;
  constructor(
    private router: ActivatedRoute,
    public recetasService: RecetasService
  ) {
    let idReceta = this.router.snapshot.paramMap.get('idReceta');
    this.receta = new Receta('');
    this.nombreIngredient = '';
    this.amountIngredient = '';
    if (idReceta) {
      let ObjetoReceta = this.recetasService.obtenerReceta(idReceta);
      if (ObjetoReceta) {
        this.receta = ObjetoReceta;
      }
    }
  }
  agregar() {
    if (this.nombreIngredient.length * this.amountIngredient.length === 0) {
      return;
    }
    const ingredient = new Ingredient(
      this.nombreIngredient,
      this.amountIngredient
    );
    this.receta.ingredients.push(ingredient);
    this.recetasService.guardarStorage();
    this.nombreIngredient = '';
    this.amountIngredient = '';
  }
  async EditarIngredient(ingredient: Ingredient) {
    let alerta = await this.recetasService.alertController.create({
      header: 'Editar ingrediente',
      inputs: [
        {
          type: 'text',
          name: 'titulo',
          placeholder: 'Ingresar nuevo nombre del ingrediente',
          value: ingredient.name,
        },
        {
          type: 'text',
          name: 'amount',
          placeholder: 'Ingresar nuevo cantidad del ingrediente',
          value: ingredient.amount,
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Editar',
          handler: (data: any) => {
            let esValido: boolean = this.recetasService.validarInput(data);
            console.log(data);
            if (esValido) {
              ingredient.name = data.titulo;
              ingredient.amount = data.amount;
              this.recetasService.presentToast('Receta editada correctamente!');
            }
          },
        },
      ],
    });
    await alerta.present();

    console.log('Editar ingrediente:', ingredient);
  }
  editar(ingredient: Ingredient) {
    this.EditarIngredient(ingredient);
  }
  eliminar(ingredient: Ingredient) {
    this.receta.ingredients = this.receta.ingredients.filter((item)=> item !== ingredient);
    this.recetasService.guardarStorage();
  }
  cambioCkeck() {
    const pendientes = this.receta.ingredients.filter(
      (item) => item.done == false
    ).length;
    if (pendientes == 0) {
      this.receta.completada = true;
      this.receta.terminadaEn = new Date();
    } else {
      this.receta.completada = false;
      this.receta.terminadaEn = undefined;
    }
    this.recetasService.guardarStorage();
  }
  ngOnInit(): void {}
}
