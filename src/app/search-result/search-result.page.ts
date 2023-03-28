import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VideoviewPage } from '../videoview/videoview.page';  
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;  
  constructor(private route: Router, private modalController: ModalController) { }

  ngOnInit() {
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }  
  user_profile() {
    this.route.navigate(['./user-profile']);
  }
  video_view(){
    this.modalController.create({component:VideoviewPage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  }  
}
