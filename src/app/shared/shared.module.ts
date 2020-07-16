import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CommonService } from '../service/common.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule,
    BrowserAnimationsModule
  ],
  providers: [
    CommonService
  ]
})
export class SharedModule { }
