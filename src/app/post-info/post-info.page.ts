import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.page.html',
  styleUrls: ['./post-info.page.scss'],
})
export class PostInfoPage implements OnInit {
share_video_with: string = "1";
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

 tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  } 
}
