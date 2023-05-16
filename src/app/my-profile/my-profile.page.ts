import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VideoviewPage } from '../videoview/videoview.page';  
import { ScrollDetail } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { APP_CONFIG, AppConfig } from '../app.config'; 
import { BuyappalertPage } from '../buyappalert/buyappalert.page';
import  firebase from 'firebase/compat/app';
import { PerfilService } from '../services/perfil.service';
import { PerfilModel } from '../models/perfilModel.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})

export class MyProfilePage implements OnInit {
 viewType: string;
 perfilRef: any[] = []; 
 perfilmodel: PerfilModel = null;
 downloadURL: Observable<string>;
 srcDefault = "../../assets/imgs/avatar.jpg";
 srcImagen = this.srcDefault;

  constructor(
    @Inject(APP_CONFIG) public config: AppConfig, 
    private route: Router, 
    private modalController: ModalController, 
    private navCtrl: NavController,
    private perfilService: PerfilService,
    private storage: AngularFireStorage
    ) { }

  ngOnInit() {
    var user = firebase.auth().currentUser;

    this.perfilService.consultPerfil(user.uid).subscribe(data => {
      this.perfilRef = [];
      console.log("User Id "+user.uid)

       data.forEach((element: any) => {
        this.perfilRef.push({
          id: element.payload.doc?.id,
          ...element.payload.doc?.data()
        })
      });

      if(this.perfilRef[0].imagenperfil!= this.srcDefault){
          const ref = this.storage.ref(this.perfilRef[0].imagenperfil);
          ref.getDownloadURL().subscribe(url => {
            this.srcImagen = url;
          });
        }

    }); 

  }


 showToolbar = false; 
 onScroll(event: CustomEvent<ScrollDetail>) {
    if (event && event.detail && event.detail.scrollTop) {
      const scrollTop = event.detail.scrollTop;
      this.showToolbar = scrollTop >= 250;
    }
  }
 setViewType(vt) {
    this.viewType = vt;
  }
  edit_profile() {
    this.route.navigate(['./edit-profile']);
  }  
  help() {
    this.route.navigate(['./help']);
  } 
  terms_conditions() {
    this.route.navigate(['./terms-conditions']);
  }  
  select_language() {
    this.route.navigate(['./select-language']);
  }
  sign_in() {
    this.navCtrl.navigateRoot(['./sign-in']);
  } 
  video_view(){
    this.modalController.create({component:VideoviewPage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  }
 
   buyappalert () {
      this.modalController
        .create({ component: BuyappalertPage })
        .then(modalElement => {
          modalElement.present()
        })
    }
    developed_by () {
      window.open('https://opuslab.works', '_system', 'location=no')
      
   }
}
