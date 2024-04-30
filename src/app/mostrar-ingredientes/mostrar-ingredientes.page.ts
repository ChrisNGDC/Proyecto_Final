import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Receta } from '../models/receta.model';
import { RecetasService } from '../services/recetas.service';
import { Ingredient } from '../models/ingredients.model';

@Component({
  selector: 'app-mostrar-ingredientes',
  templateUrl: './mostrar-ingredientes.page.html',
  styleUrls: ['./mostrar-ingredientes.page.scss'],
})
export class MostrarIngredientesPage implements OnInit {
  receta: Receta;
  nombreIngrediente: string = '';
  amountIngrediente: string = '';
  constructor(
    private router: ActivatedRoute,
    public recetasService: RecetasService,
    private routerB: Router
  ) {
    let idReceta = this.router.snapshot.paramMap.get('idReceta');
    this.receta = new Receta('', [], [], '');
    if (idReceta) {
      let ObjetoReceta = this.recetasService.obtenerReceta(idReceta);
      if (ObjetoReceta) {
        this.receta = ObjetoReceta;
      }
    }
  }
  agregar() {
    if (this.nombreIngrediente.length * this.amountIngrediente.length === 0) {
      return;
    }
    const ingrediente = new Ingredient(this.nombreIngrediente, this.amountIngrediente);
    this.receta.ingredients.push(ingrediente);
    this.recetasService.guardarStorage();
    this.nombreIngrediente = '';
    this.amountIngrediente = '';
  }
  async EditarIngrediente(ingrediente: Ingredient) {
    let alerta = await this.recetasService.alertController.create({
      header: 'Editar ingrediente',
      inputs: [
        {
          type: 'text',
          name: 'titulo',
          placeholder: 'Ingresar nuevo ingrediente',
          value: ingrediente.name,
        },
        {
          type: 'text',
          name: 'amount',
          placeholder: 'Ingresar nueva cantidad',
          value: ingrediente.amount,
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
              ingrediente.name = data.titulo;
              ingrediente.amount = data.amount;
              this.recetasService.presentToast('Ingrediente editada correctamente!');
            }
          },
        },
      ],
    });
    await alerta.present();
  }
  editar(ingrediente: Ingredient) {
    this.EditarIngrediente(ingrediente);
  }
  eliminar(ingrediente: Ingredient) {
    this.receta.ingredients = this.receta.ingredients.filter((item)=> item !== ingrediente);
    this.recetasService.guardarStorage();
  }
  ngOnInit(): void {}
  recetaSeleccionada(receta: Receta) {
    const URL = '/mostrarInstrucciones/' + receta.id
    this.routerB.navigateByUrl(URL);
  }
}
