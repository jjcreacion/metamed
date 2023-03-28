import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonSlides } from '@ionic/angular';
import { CommentPage } from '../comment/comment.page';
import { Video } from 'src/models/video.models';

@Component({
  selector: 'app-videoview',
  templateUrl: './videoview.page.html',
  styleUrls: ['./videoview.page.scss'],
})
export class VideoviewPage implements OnInit {
  @ViewChild('videosliderinner', { static: false }) slides: IonSlides;
  favorite_icon = false;
  favorite_icon_2 = false;
  viewType: string;
  slideOptions2 = { direction: 'vertical' };
  videosToShow: Array<Video>;
  currentVideoIndex: number;
  videoElement: any;

  constructor(private route: Router, private modalController: ModalController) {
    let vids = [new Video("assets/video/vid1.mp4"), new Video("assets/video/vid2.mp4"), new Video("assets/video/vid3.mp4"), new Video("https:io//medverseblob.blob.core.windows.net/videopoolpepe/IMG_0188.mp4/vid4.mp4")];
    let videos1 = new Array<Video>();
    for (let i = 0; i < 5; i++) videos1 = videos1.concat(vids);

    this.videosToShow = videos1;
  }

  ngOnInit() {
    this.setupVideoElement();
    this.videoElement.ontimeupdate = (event) => {
      if (!this.currentVideoIndex || this.currentVideoIndex != -1) {
        if ((event as any).target && (event as any).target.currentTime && (event as any).target.duration) {
          this.videosToShow[this.currentVideoIndex].progress = String((Number((event as any).target.currentTime) * 100) / Number((event as any).target.duration));
          console.log(("progress_" + this.currentVideoIndex), this.videosToShow[this.currentVideoIndex].progress);
          if ((event as any).target.currentTime == (event as any).target.duration) {
            this.slides.isEnd().then(isLast => {
              console.log("isLast", isLast);
              if (isLast) {
                this.initPlayback();
              } else {
                this.slides.slideNext();
              }
            });
          }
        }
      }
    };
  }

  ionViewWillLeave() {
    this.pausePlaying2();
  }

  ionViewDidEnter() {
    this.initPlayback();
  }

  slideChanged2() {
    this.slides.getActiveIndex().then(curSliderIndex => {
      console.log("getActiveIndex", curSliderIndex);
      if (this.currentVideoIndex != curSliderIndex) {
        //this.pausePlaying();
        this.currentVideoIndex = curSliderIndex;
        console.log("currentVideoIndex", this.currentVideoIndex);

        this.setupVideoElement();

        this.videoElement.src = this.videosToShow[this.currentVideoIndex].src;
        this.videoElement.autoplay = true;
        this.videoElement.load();
      }
    });
  }

  initPlayback() {
    setTimeout(() => {
      this.currentVideoIndex = -1;
      this.slides.slideTo(0);
      this.slideChanged2();
    }, 100);
  }

  pausePlaying2() {
    try {
      this.setupVideoElement();
      this.videoElement.pause();
    } catch (exception) {
      console.log("exception", exception);
    }
  }

  resumePlaying2() {
    try {
      this.setupVideoElement();
      this.videoElement.play();
    } catch (exception) {
      console.log("exception", exception);
    }
  }

  setupVideoElement() {
    if (!this.videoElement) this.videoElement = (<HTMLVideoElement>document.getElementById('myvideoinner'));
  }

  setViewType(vt) {
    this.viewType = vt;
  }
  dismiss() {
    this.modalController.dismiss();
  }
  toggleFavorite_icon() {
    this.favorite_icon = !this.favorite_icon;
  }
  toggleFavorite_icon_2() {
    this.favorite_icon_2 = !this.favorite_icon_2;
  }
  user_profile() {
    this.modalController.dismiss();
    this.route.navigate(['./user-profile']);
  }
  videos_list() {
    this.modalController.dismiss();
    this.route.navigate(['./video-list']);
  }
  comment() {
    this.modalController.create({ component: CommentPage }).then((modalElement) => {
      modalElement.present();
    }
    )
  }
}
