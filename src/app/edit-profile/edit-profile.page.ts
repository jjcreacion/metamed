import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import  firebase from 'firebase/compat/app';
import { PerfilService } from '../services/perfil.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@angular/fire/storage';
import { ref, uploadBytes } from 'firebase/storage';
import { error } from 'console';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})

export class EditProfilePage implements OnInit {
  public editForm: FormGroup;
  perfilRef: any[] = []; 
  gender: string = "female";
  idPerfil: any; 
  srcDefault = "../../assets/imgs/avatar.jpg";
  srcImagen = this.srcDefault;
  idfile: any;
  imgProfile : any;
  filePath: any;
  loading = false;
  editarimg = false;
  downloadURL: any;

  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;  

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private perfilService: PerfilService,
    private db: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage,
    private route: Router,
    ) 
    {
      this.editForm = this.fb.group({
        biografia: [''],
        correo: [''],
        facebook: [''],
        instagram: [''],
        nombre: [''],
        telefono: [''],
        twitter: [''],
      })
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

      this.filePath = this.perfilRef[0].imagenperfil;

      if(this.perfilRef[0].imagenperfil != this.srcDefault){
        const ref = this.storage.ref(this.perfilRef[0].imagenperfil);
        ref.getDownloadURL().subscribe(url => {
          this.srcImagen = url;
        });
      }

      this.editForm = this.fb.group({
        biografia: [this.perfilRef[0].biografia],
        correo: [this.perfilRef[0].correo],
        facebook: [this.perfilRef[0].facebook],
        instagram: [this.perfilRef[0].instagram],
        nombre: [this.perfilRef[0].nombre],
        telefono: [this.perfilRef[0].telefono],
        twitter: [this.perfilRef[0].twitter],
      })

     }) 
     
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }   

  tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  } 

  editarPerfil(id: string) {
    this.editarimg = true; 
    this.loading = true;

    const perfil: any = {
      biografia: this.editForm.value.biografia,
      correo: this.editForm.value.correo,
      facebook: this.editForm.value.facebook,
      instagram: this.editForm.value.instagram,      
      nombre: this.editForm.value.nombre,
      telefono: this.editForm.value.telefono,
      twitter: this.editForm.value.twitter,
      imagenperfil: this.filePath
    }
    
    this.perfilService.updatePerfil(id,perfil).then(() => {
      
       if(this.editarimg){
        const task = this.storage.upload(this.filePath, this.imgProfile);
        task.snapshotChanges().pipe(finalize(() => {
            this.downloadURL = this.storage.ref(this.filePath).getDownloadURL();
            console.log("URL IMG subiendo ="+ this.downloadURL);      
            this.loading = false;
            this.route.navigate(['./tabs/my_profile'], { queryParams: { cache: false } });
          })
        ).subscribe();
      }      
      else{ 
        this.loading = false;
        this.navCtrl.navigateRoot(['./tabs/my_profile']);
      }
    });

  }
  
  loadImageFromDevice(e) {
    if(e.target.files[0]){    
      this.editarimg = true;    
      var reader = new FileReader();
      this.imgProfile = e.target.files[0];
      this.filePath = this.perfilRef[0].uid+"/img/"+this.imgProfile.name;
      console.log(this.imgProfile);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) =>{
        this.srcImagen = event.target.result;
      }      
    }
    else
     this.srcImagen = this.srcDefault
  }
}
