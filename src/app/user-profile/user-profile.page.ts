import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VideoviewPage } from '../videoview/videoview.page';  
import { ScrollDetail } from '@ionic/core';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit { 

  constructor(private route: Router, private modalController: ModalController) { }

  ngOnInit() {
  }
 showToolbar = false; 
 onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 250;
    }
}

  chat_screen() {
    this.route.navigate(['./chat']);
  }
  followers() {
    this.route.navigate(['./followers']);
  }
  video_view(){
    this.modalController.create({component:VideoviewPage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  }     
}
