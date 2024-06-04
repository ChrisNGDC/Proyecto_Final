import { Component } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { AutheticationService } from '../services/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page  {

  photo: UserPhoto = {
    id: '-1',
    filepath: 'default',
    webviewPath: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  };

  current_user : string | null | undefined

  constructor(private photoService: PhotoService, private auth: AutheticationService, private router: Router) {
    this.getUsername()
  }

  /**
   * Toma una foto con la camara y la asigna a la variable photo
   */
  takePhoto() {
    this.photoService
      .takePhoto('0', 'profile-photo')
      .then((x) => (this.photo = this.photoService.profilePhotos[0]));
  }
  logout() {
    this.auth.signOut()
    this.router.navigate(['/login'])
  }

  getUsername() {
    this.auth.getProfile().then((data) => {
      this.current_user = data?.email
    })
  }
}
