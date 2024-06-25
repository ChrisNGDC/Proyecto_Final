import { Component } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { AutheticationService } from '../services/authetication.service';
import { Router } from '@angular/router';

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

  current_user: string | null | undefined;

  constructor(
    private photoService: PhotoService,
    private auth: AutheticationService,
    private router: Router
  ) {
    this.auth.getCurrentUser();
    this.getUsername();
    this.getPicture();
  }

  /**
   * Toma una foto con la camara, la asigna a la variable photo y la guarda en la base de datos
   */
  takePhoto() {
    this.photoService.takePhoto('0', 'profile-photo').then((x) => {
      this.photo = this.photoService.profilePhotos[0];
      this.auth.getData()
    });
  }
  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  getUsername() {
    this.auth.getData().then((data) => {
      if (data) {
        this.current_user = data['Nombre' as keyof typeof data];
      }
    });
  }
  getPicture() {
    this.auth.getData().then((data) => {
      if (data) {
        this.photo = data['Foto' as keyof typeof data];
      }
    });
  }
}
