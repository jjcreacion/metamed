import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import  firebase from 'firebase/compat/app';
import { PerfilService } from '../services/perfil.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth,
    private perfilService: PerfilService
  ) 
  { }

  async register(email:string, password: string){
    
    let uid: any = null;
    
    try{
      let data = await this.afauth.createUserWithEmailAndPassword(email, password)
      uid = data.user.uid;
      await this.agregarPerfil(email, uid); 
      console.log("Uid "+uid);
      return null;
    }catch(error){
      console.log("Error = "+error.code);
      return error.code;
    }     

  }

  async agregarPerfil(email:string, uid: string){
    
    const perfil: any = {
      biografia: "Biografia",
      correo: email,
      facebook: "",
      instagram: "",
      nombre: "Nombre",
      telefono: "",
      twitter: "",
      uid: uid,
      imagenperfil: "../../assets/imgs/avatar.jpg"
    }
   
    this.perfilService.agregarPerfil(perfil).then(() => {
      console.log("Agregado");
    }).catch(error => {
      console.log(error);
    })
  }

  async login(email:string, password: string){

    try{
      return await this.afauth.signInWithEmailAndPassword(email, password);
    }catch(error){
      console.log("Error en login", error );
      return null;
    }

  }

  async loginWithGoogle(){

    try{
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }catch(error){
      console.log("Error en login Google", error );
      return null;
    }

  }

  async loginWithFacebook(){

    try{
      return await this.afauth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }catch(error){
      console.log("Error en login Facebook", error );
      return null;
    }

  }

}
