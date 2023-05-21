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
     .collection('video')
     .snapshotChanges();
    }

}
