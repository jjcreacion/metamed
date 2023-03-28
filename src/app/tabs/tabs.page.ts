import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddvideoPage } from '../addvideo/addvideo.page';  
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private route: Router, private modalController: ModalController) {}


  add_video(){
    this.modalController.create({component:AddvideoPage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  }
}
