import { Component } from '@angular/core';
import { BaseRecetasService } from '../services/base-recetas.service';
import { RecetasService } from '../services/recetas.service';
import { Ingredient } from '../models/ingredients.model';
import { Instruction } from '../models/intruction.model';
import { Area } from '../models/areas.model';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  recetasAPI: any[] = [];
  cantidadRecetas = 9;
  isActive: boolean = false;
  categorias: any[] = [];
  categoriaActual = "Categorias";
  countriesNames: string[] = [];
  // Esto es de esta manera debido a que la API da el nombre del area y las imagenes se trabajan con las siglas y no hay una conversion directa debido a los nombres particulares que da la API
  areas: Area[] = [
    new Area('America', 'US'),
    new Area('British', 'GB'),
    new Area('Canadian', 'CA'),
    new Area('Chinese', 'CN'),
    new Area('Croatian', 'HR'),
    new Area('Dutch', 'NL'),
    new Area('Egyptian', 'EG'),
    new Area('Filipino', 'PH'),
    new Area('French', 'FR'),
    new Area('Greek', 'GR'),
    new Area('Indian', 'IN'),
    new Area('Irish', 'IE'),
    new Area('Italian', 'IT'),
    new Area('Jamaican', 'JM'),
    new Area('Japanese', 'JP'),
    new Area('Kenyan', 'KE'),
    new Area('Malaysian', 'MY'),
    new Area('Mexican', 'MX'),
    new Area('Moroccan', 'MA'),
    new Area('Polish', 'PL'),
    new Area('Portuguese', 'PT'),
    new Area('Russian', 'RU'),
    new Area('Spanish', 'ES'),
    new Area('Thai', 'TH'),
    new Area('Tunisian', 'TN'),
    new Area('Turkish', 'TR'),
    new Area('Uruguay', 'UY'),
    new Area('Vietnamese', 'VN'),
  ];
  constructor(
    public baseRecetas: BaseRecetasService,
    public recetasService: RecetasService,
    public translate: TranslateService
  ) {}
  /**
   * Se ejecuta al iniciar la carga de la tab
   */
  ngOnInit() {
    this.ionViewDidLoad();
  }
  /**
   * Se ejecuta al haber cargado la tab de manera correcta
   */
  ionViewDidLoad() {
    this.getRecetas();
    this.getCategorias();
  }
  getCategorias() {
    this.categorias = [];
    this.baseRecetas.obtenerCategorias().subscribe({
      next: (data) => {
        Object.values(data)[0].forEach((categoria: any) =>
          this.categorias.push(categoria)
        );
      },
      error: (error) => console.log(error.statusText),
    });
  }
  /**
   * Obtiene recetas para rellenar la tab
   */
  getRecetas() {
    this.recetasAPI = [];
    for (let i = 0; i < this.cantidadRecetas; i++) {
      this.baseRecetas.obtenerReceta().subscribe({
        next: (data) => this.recetasAPI.push(data),
        error: (error) => console.log(error.statusText),
      });
    }
    this.recetasAPI.forEach((receta) => (receta.favorite = false));
  }
  /**
   * Guarda como receta segun los parametros.
   * @param nombre Nombre de la Receta
   * @param ingredientes Lista de ingredientes
   * @param instrucciones Lista de pasos
   * @param imagen Imagen del plato terminado
   */
  async AgregarReceta(
    nombre: string,
    ingredientes: Ingredient[],
    instrucciones: Instruction[],
    imagen: string,
    id: number
  ) {
    let creadaOk = this.recetasService.crearReceta(
      nombre,
      ingredientes,
      instrucciones,
      imagen,
      id
    );
    if (creadaOk) {
      this.recetasService.presentToast('Receta favorita guardada!');
    }
  }
  interactuarReceta(unaReceta: any) {
    console.log(unaReceta);
    if (!unaReceta.favorite) {
      console.log('guardando');
      this.guardarReceta(unaReceta);
    } else {
      console.log('Eliminando');
      this.recetasService.eliminarReceta(unaReceta.idMeal / 1);
      this.recetasService.presentToast('Receta favorita olvidada!');
    }
    unaReceta.favorite = !unaReceta.favorite;
  }
  /**
   * Convierte una receta de la API a una de estructura propia
   * @param unaReceta Una receta proveniente de la API
   */
  guardarReceta(unaReceta: any) {
    let ingredientes = [];
    let instrucciones: Instruction[] = [];
    let numeroIngrediente = 1;
    let imagen: string = unaReceta['strMealThumb'];
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
      this.translate.traslate(instruccionStr).then((result) => {
        instruccionStr = result
      })
      instrucciones.push(new Instruction(instruccionStr, false));
    });
    this.AgregarReceta(
      nombre,
      ingredientes,
      instrucciones,
      imagen,
      unaReceta.idMeal / 1
    );
  }
  elegirCategoria(categoria: string) {
    if (categoria != 'Volver') {
      this.categoriaActual = categoria;
      this.categorias = [
        {
          "strCategory": "Volver",
          "strCategoryThumb": "../assets/back.png",
        }
      ]
      this.baseRecetas.obtenerRecetasSegunCategoria(categoria).subscribe({
        next: (data) => {
          Object.values(data).forEach((recetas: any) =>
            recetas.forEach( (receta: any) =>
              this.categorias.push({
              "strCategory": receta["strMeal"],
              "strCategoryThumb": receta["strMealThumb"]
            })
          ));
        },
        error: (error) => console.log(error.statusText),
      });
      console.log(this.categorias)
    } else {
      this.categoriaActual = "Categorias";
      this.getCategorias();
    }
  }
}
