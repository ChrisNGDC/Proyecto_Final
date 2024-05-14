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
   * @function TomarFoto
   * @description Le permite sacar un foto y luego la asigna al atributo photo
   */
  public takePhoto() {
    this.photoService
      .takePhoto('0', 'profile-photo')
      .then((x) => (this.photo = this.photoService.profilePhotos[0]));
  }
}
