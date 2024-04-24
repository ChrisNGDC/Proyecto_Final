import { Component } from '@angular/core';
import { BaseRecetasService } from '../services/base-recetas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  recetasAPI: any[] = []
  constructor(public baseRecetas: BaseRecetasService) {}
  ngOnInit() {
    this.ionViewDidLoad();
  }
  ionViewDidLoad() {
    for (let i = 0; i < 10; i++) {
      this.baseRecetas.obtenerReceta().subscribe({
        next: (data) => this.recetasAPI.push(data),
        error: (error) => console.log(error),
      });
    }
  }
  presbutton() {
    console.log(this.recetasAPI[0].meals[0].strMeal)
  }
}
