import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
 
import { IonicModule } from '@ionic/angular';

import { AddvideoPageRoutingModule } from './addvideo-routing.module';

import { AddvideoPage } from './addvideo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,   
    AddvideoPageRoutingModule
  ],
  declarations: [AddvideoPage]
})
export class AddvideoPageModule {}
