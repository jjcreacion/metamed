import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  gender: string = "female";
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;    
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
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
}
