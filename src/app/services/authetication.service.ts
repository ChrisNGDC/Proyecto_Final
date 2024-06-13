import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { UserPhoto } from './photo.service';

const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class AutheticationService {
  currentUserData: any;
  constructor() {}

  async registerUser(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  async signOut() {
    return signOut(auth);
  }
  async getData() {
    const docRef = doc(db, "Usuarios", this.currentUserData['uid']);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
    return false
  }
  async generateUser(nombre: string) {
    await this.getCurrentUser();
    try {
      await setDoc(doc(db, "Usuarios", this.currentUserData['uid']), {
        Nombre: nombre,
        Foto: {
          id: '-1',
          filepath: 'default',
          webviewPath: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        }
      });      
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  async updatePhoto(picUrl: UserPhoto) {
    await this.getCurrentUser();
    try {
      await updateDoc(doc(db, "Usuarios", this.currentUserData['uid']), {
        Foto: picUrl
      });      
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  async getCurrentUser() {
    this.currentUserData = auth.currentUser;
  }
}
