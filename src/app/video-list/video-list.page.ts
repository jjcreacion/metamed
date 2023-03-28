import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideoviewPage } from '../videoview/videoview.page';  
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.page.html',
  styleUrls: ['./video-list.page.scss'],
})
export class VideoListPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  video_view(){
    this.modalController.create({component:VideoviewPage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  }  
}
