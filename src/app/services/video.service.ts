import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private firestore: AngularFirestore,
    private firestoreDb: AngularFireDatabase,
    ) 
   { }

   agregarVideo(data: any): Promise<any> {
    return this.firestore
    .collection('video')
    .add(data);
    }

   listarVideos(): Observable<any> {
     return this.firestore
     .collection('video', ref => ref.orderBy('fecha', 'desc'))
     .snapshotChanges();
    }

   listarAleatorio(): Observable<any> {
      const random = Math.random() * 100;
      console.log("Remadom "+random);
      return this.firestore
        .collection('video', ref => ref.orderBy('fecha').startAt(random).limit(1))
        .snapshotChanges();
    } 

}
