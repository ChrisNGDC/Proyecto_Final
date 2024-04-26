import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetasService } from '../services/recetas.service';
import { Receta } from '../models/receta.model';
import { Instruction } from '../models/intruction.model';

@Component({
  selector: 'app-mostrarInstrucciones',
  templateUrl: './mostrarInstrucciones.page.html',
  styleUrls: ['./mostrarInstrucciones.page.scss'],
})
export class MostrarInstrucciones implements OnInit {
  receta: Receta;
  descripcionPaso: string = '';
  constructor(
    private router: ActivatedRoute,
    public recetasService: RecetasService
  ) {
    let idReceta = this.router.snapshot.paramMap.get('idReceta');
    this.receta = new Receta('', [], []);
    if (idReceta) {
      let ObjetoReceta = this.recetasService.obtenerReceta(idReceta);
      if (ObjetoReceta) {
        this.receta = ObjetoReceta;
      }
    }
  }
  agregar() {
    if (this.descripcionPaso.length === 0) {
      return;
    }
    const intruccion = new Instruction(this.descripcionPaso, false);
    this.receta.recipe.push(intruccion);
    this.recetasService.guardarStorage();
    this.descripcionPaso = '';
  }
  async EditarInstruccion(instruccion: Instruction) {
    let alerta = await this.recetasService.alertController.create({
      header: 'Editar intruccion',
      inputs: [
        {
          type: 'text',
          name: 'titulo',
          placeholder: 'Ingresar nueva instruccion',
          value: instruccion.description,
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
              instruccion.description = data.titulo;
              this.recetasService.presentToast('Instruccion editada correctamente!');
            }
          },
        },
      ],
    });
    await alerta.present();
  }
  editar(instruccion: Instruction) {
    this.EditarInstruccion(instruccion);
  }
  eliminar(instruccion: Instruction) {
    this.receta.recipe = this.receta.recipe.filter((item)=> item !== instruccion);
    this.recetasService.guardarStorage();
  }
  cambioCkeck() {
    const pendientes = this.receta.recipe.filter(
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
