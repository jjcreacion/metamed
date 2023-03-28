import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
   
import { IonicModule } from '@ionic/angular';

import { VideoviewPageRoutingModule } from './videoview-routing.module';

import { VideoviewPage } from './videoview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,     
    VideoviewPageRoutingModule
  ],
  declarations: [VideoviewPage]
})
export class VideoviewPageModule {}
