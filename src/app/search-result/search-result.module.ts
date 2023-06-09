import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
  
import { IonicModule } from '@ionic/angular';

import { SearchResultPageRoutingModule } from './search-result-routing.module';

import { SearchResultPage } from './search-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,  
    SearchResultPageRoutingModule
  ],
  declarations: [SearchResultPage]
})
export class SearchResultPageModule {}
