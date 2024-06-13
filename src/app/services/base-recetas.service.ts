import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseRecetasService {

  constructor(
    public http: HttpClient
  ) { }
  obtenerReceta() {
    return this.http.get('https://www.themealdb.com/api/json/v1/1/random.php');
  }
  obtenerCategorias(){ 
    return this.http.get("https://www.themealdb.com/api/json/v1/1/categories.php");
  }
  obtenerPaises() {
    return this.http.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
  }
  obtenerRecetasSegunCategoria(categoria: string) {
    return this.http.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categoria);
  }
  obtenerRecetaSegunID(id: string) {
    return this.http.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
  }
  obtenerRecetasSegunPais(pais: string) {
    return this.http.get("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + pais)
  }
}
