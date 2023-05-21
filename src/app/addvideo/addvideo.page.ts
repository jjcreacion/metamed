import { Component, HostListener, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../app.config';
import { BuyappalertPage } from '../buyappalert/buyappalert.page';
import { PerfilService } from '../services/perfil.service';
import { VideoService } from '../services/video.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import  firebase from 'firebase/compat/app';
import { Storage } from '@angular/fire/storage';
import { ref, uploadBytes } from 'firebase/storage';
import { error } from 'console';
import { finalize } from 'rxjs/operators';
import { CanDeactivate } from '@angular/router';
import { formatDate } from '@angular/common';
import { VideoModel } from '../models/video-model.model';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.page.html',
  styleUrls: ['./addvideo.page.scss'],
})

export class AddvideoPage implements OnInit {
  video: any;
  filePath: any;
  perfilRef: any[] = [];
  videoModel: VideoModel; 
  extension: any; 
  filesize : number = 0 ; 
  sizevideo: any; 
  textLabel = "Selecionar Video";
  porcentaje = 0;
  loading = false;
  srcDefault = "../../assets/imgs/avatar.jpg";
  srcImagen = this.srcDefault;
  task: any;

  constructor(
    @Inject(APP_CONFIG) public config: AppConfig, 
    private modalController: ModalController, 
    private route: Router,
    private perfilService: PerfilService,
    private videoService: VideoService,
    private storage: AngularFireStorage
    ) 
  { 
   
  }

  ngOnInit() {
   var user = firebase.auth().currentUser;
   
    this.perfilService.consultPerfil(user.uid).subscribe(data => {
      this.perfilRef = [];

       data.forEach((element: any) => {
        this.perfilRef.push({
          id: element.payload.doc?.id,
          ...element.payload.doc?.data()
        })
      });


      if(this.perfilRef[0].imagenperfil != this.srcDefault){
        const ref = this.storage.ref(this.perfilRef[0].imagenperfil);
        ref.getDownloadURL().subscribe(url => {
          this.srcImagen = url;
        });
      }

     }) 

 }
 
 dismiss(){
   this.modalController.dismiss();
 }
 
 add_video_filter() {
   this.modalController.dismiss();     
    this.route.navigate(['./filter']);
  } 
 

 buyappalert () {
    this.modalController
      .create({ component: BuyappalertPage })
      .then(modalElement => {
        modalElement.present()
      })
  }

  loadVideoFromDevice(e) {

    if(e.target.files[0]){    
      var reader = new FileReader();
      this.video = e.target.files[0];
      this.filePath = this.perfilRef[0].uid+"/video/"+this.video.name;
      this.extension = this.video.name.split('.').pop();
      this.filesize = this.video.size;
      this.textLabel = this.video.name;

      if(this.filesize <= 1000000){
        this.sizevideo = (this.filesize/1000).toFixed(2) + 'Kb';
      }
      if(this.filesize > 1000000 && this.filesize <= 1000000000 ){
        this.sizevideo = (this.filesize/1000000).toFixed(2) + 'mb';
      }
      if(this.filesize > 1000000000 && this.filesize <= 1000000000000 ){
        this.sizevideo = (this.filesize/1000000000).toFixed(2) + 'gb';
      }
      
      console.log(this.video);
      console.log("tipo video"+this.extension);
      console.log("Tamano "+this.sizevideo);
    }
   
  }

  cargarVideo(){
    const fecha = new Date();

    this.videoModel = {
      id: "",
      extension: this.extension,
      fecha: formatDate(fecha, 'yyyy-MM-dd', 'en-US'),
      ruta: this.filePath,
      tamano: this.sizevideo,
      uid: this.perfilRef[0].uid,
    }

    console.log(this.videoModel);

    this.loading = true;
    console.log("Subir...");  
    this.task = this.storage.upload(this.filePath, this.video);
        this.task.snapshotChanges().pipe(finalize(() => {
            console.log("Subida...");      
            this.loading = false;

            this.videoService.agregarVideo(this.videoModel).then(rep => {
                this.textLabel = "Selecionar Video";   
                this.loading = false;
                this.porcentaje = 0;
                this.filesize = 0;
              this.route.navigate(['./tabs/home'], { queryParams: { cache: false } });
            });

          })
        ).subscribe((snapshot) => {
          this.porcentaje = snapshot.bytesTransferred * 100 / snapshot.totalBytes;
          console.log("Porcentaje ="+this.porcentaje);
        });   
  }

  cancel(){
    this.task.cancel();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    alert("Salida");
  }

}
