import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public profilePhotos: UserPhoto[] = [];
  public photos: UserPhoto[] = [];
  constructor() { }
  public async takePhoto(id:string, filePath: string) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    if (id == "0") {
      this.profilePhotos.pop()
      this.profilePhotos.unshift({
        id: id,
        filepath: filePath,
        webviewPath: capturedPhoto.webPath!
      });
    }
    else {
      this.photos.unshift({
        id: id,
        filepath: filePath,
        webviewPath: capturedPhoto.webPath!
      });
    }
  }
}

export interface UserPhoto {
  id: string;
  filepath: string;
  webviewPath?: string;
}
