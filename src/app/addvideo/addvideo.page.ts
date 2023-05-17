import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../app.config';
import { BuyappalertPage } from '../buyappalert/buyappalert.page';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.page.html',
  styleUrls: ['./addvideo.page.scss'],
})
export class AddvideoPage implements OnInit {

  constructor(@Inject(APP_CONFIG) public config: AppConfig, private modalController: ModalController, private route: Router) { }

  ngOnInit() {
  }
 dismiss(){
   this.modalController.dismiss();
 }
 
 add_video_filter() {
   this.modalController.dismiss();     
    this.route.navigate(['./filter']);
  } 
 
 add_video_galery() {
    this.modalController.dismiss();     
     this.route.navigate(['./explore']);
  }

 buyappalert () {
    this.modalController
      .create({ component: BuyappalertPage })
      .then(modalElement => {
        modalElement.present()
      })
  }
}
