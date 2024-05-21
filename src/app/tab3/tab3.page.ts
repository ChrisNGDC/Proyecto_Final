import { Component } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  photo: UserPhoto = {
    id: '-1',
    filepath: 'default',
    webviewPath: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  };

  constructor(public photoService: PhotoService) {}

  /**
   * Toma una foto con la camara y la asigna a la variable photo
   */
  public takePhoto() {
    this.photoService
      .takePhoto('0', 'profile-photo')
      .then((x) => (this.photo = this.photoService.profilePhotos[0]));
  }
}
