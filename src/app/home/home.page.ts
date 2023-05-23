import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonSlides } from '@ionic/angular';
import { CommentPage } from '../comment/comment.page';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Video } from 'src/models/video.models';
import { BuyappalertPage } from '../buyappalert/buyappalert.page';
import  firebase from 'firebase/compat/app';
import { PerfilService } from '../services/perfil.service';
import { VideoService } from '../services/video.service';
import { ref, uploadBytes } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('videoslider', { static: true }) slides: IonSlides;

  tab: string = "related";
  videoRef: any[] = [];
  rutasRef: any[] = [];
  favorite_icon = false;
  favorite_icon_2 = false;
  slideOptions1 = { direction: 'vertical' };
  videosToShow: Array<Video>;
  videos1: Array<Video>;
  videos2: Array<Video>;
  currentVideoIndex: number;
  videoElement: any;
  vids: any[] = [];
  urls: string[] = []; 
  promises = [];
  constructor(
    private perfilService: PerfilService,
    private videoService: VideoService,
    @Inject(APP_CONFIG) public config: AppConfig,
    private route: Router, 
    private modalController: ModalController,
    private storage: AngularFireStorage,
    )
   {
     this.selectVideo();
   }


  selectVideo(){
   
    let vids;
    let tam = 0;
    let cont = 0;
    this.videos1 = new Array<Video>();
    this.videos2 = new Array<Video>();  

    this.videoService.listarVideos().subscribe(data => {
      this.videoRef = [];
     
       data.forEach((element: any) => {
        this.videoRef.push({
          id: element.payload.doc?.id,
          ...element.payload.doc?.data()
        })
        tam++;
      }); 
     
       this.videoRef.forEach((element: any) => {
         const ref = this.storage.ref(element.ruta);
         ref.getDownloadURL().subscribe(url => { 
            vids = new Video(url);
            this.videos1 = this.videos1.concat(vids);
            this.videos2 = this.videos2.concat(vids);
            cont++;
            if(cont == tam){  
              this.videosToShow = this.videos1;
              this.onSegmentChange2();
              console.log("Fin del recorrido");
           }               
         })
       });

     /* const ref = this.storage.ref(this.videoRef[0].ruta);
      ref.getDownloadURL().subscribe(url => { 
        vids = new Video(url);
        console.log("vids = "+vids.src);
        this.videos1 = this.videos1.concat(vids);
        this.videos2 = this.videos2.concat(vids);

        this.videosToShow = this.videos1;
        
        this.onSegmentChange2();
       }); */


     })
    
   
    let vids2 = new Video("assets/video/vid1.mp4");
    console.log("vids2 = "+vids2.src);
  }

  setupVideoElement() {
    if (!this.videoElement) this.videoElement = (<HTMLVideoElement>document.getElementById('myvideo'));
  }

  ngOnInit() {
    
    this.setupVideoElement();
    this.videoElement.ontimeupdate = (event) => {
      if (!this.currentVideoIndex || this.currentVideoIndex != -1) {
        if ((event as any).target && (event as any).target.currentTime && (event as any).target.duration) {
          this.videosToShow[this.currentVideoIndex].progress = String((Number((event as any).target.currentTime) * 100) / Number((event as any).target.duration));
          if ((event as any).target.currentTime == (event as any).target.duration) {
            this.slides.isEnd().then(isLast => {
              if (isLast) {
                this.onSegmentChange2();
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
    this.pausePlaying1();
  }

  ionViewDidEnter() {
    this.onSegmentChange2();
  }

  slideChanged1() {

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

  toProfile(){
    this.route.navigate(['/edit-profile']);
  }

  onSegmentChange() {
    /* this.videosToShow = this.tab == "related" ? this.videos1 : this.videos2;
    setTimeout(() => {
      this.currentVideoIndex = -1;
      this.slides.slideTo(0);
      this.slideChanged1();
    }, 100);*/
    console.log("Cambiar");
  }

 onSegmentChange2() {
     this.videosToShow = this.tab == "related" ? this.videos1 : this.videos2;
    setTimeout(() => {
      this.currentVideoIndex = -1;
      this.slides.slideTo(0);
      this.slideChanged1();
    }, 100);
  }

  pausePlaying1() {
    try {
      this.setupVideoElement();
      this.videoElement.pause();
    } catch (exception) {
      console.log("exception", exception);
    }
  }

  resumePlaying1() {
    try {
      this.setupVideoElement();
      this.videoElement.play();
    } catch (exception) {
      console.log("exception", exception);
    }
  }

  toggleFavorite_icon() {
    this.favorite_icon = !this.favorite_icon;
  }
  toggleFavorite_icon_2() {
    this.favorite_icon_2 = !this.favorite_icon_2;
  }
  user_profile() {
    this.route.navigate(['./user-profile']);
  }
  videos_list() {
    this.route.navigate(['./video-list']);
  }
  comment() {
    this.modalController.create({ component: CommentPage }).then((modalElement) => {
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
}
