import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';

import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,       
    EditProfilePageRoutingModule,
    ReactiveFormsModule,
    provideStorage(() => getStorage())
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
