import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VideoviewPage } from '../videoview/videoview.page';  
import { ScrollDetail } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { APP_CONFIG, AppConfig } from '../app.config'; 
import { BuyappalertPage } from '../buyappalert/buyappalert.page'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
 viewType: string;
  constructor(@Inject(APP_CONFIG) public config: AppConfig, private route: Router, private modalController: ModalController, private navCtrl: NavController,) { }

  ngOnInit() {
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
