import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() { }
  
  async traslate(text: string) {
    let translatedText: string = text;
    // encontrar API para traducir instrucciones
    return translatedText;
  }
}
