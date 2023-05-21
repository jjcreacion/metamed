import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class PerfilService {

  constructor(
    private firestore: AngularFirestore,
    private firestoreDb: AngularFireDatabase,
    ) {  }

  agregarPerfil(data: any): Promise<any> {
    return this.firestore
    .collection('perfil')
    .add(data);
  }
  
  consultPerfil(id: string): Observable<any> {
   return this.firestore
   .collection('perfil', ref => ref.where('uid','==',id))
   .snapshotChanges();
  }

  consultPerfil2(id: string): Observable<any> {
    return this.firestore
    .collection('perfil', ref => ref.where('uid','==',id))
    .valueChanges();
  }

  updatePerfil(id: string, data:any): Promise<any> {
    return this.firestore
    .collection('perfil')
    .doc(id)
    .update(data);
  }
    
}
