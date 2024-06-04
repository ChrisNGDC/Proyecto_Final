import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { environment } from 'src/environments/environment';

const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root',
})
export class AutheticationService {
  constructor() {}

  async registerUser(email: string, password: string, name: string) {
    return createUserWithEmailAndPassword(auth, email, password);
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

  async getProfile() {
    return auth.currentUser;
  }
}
