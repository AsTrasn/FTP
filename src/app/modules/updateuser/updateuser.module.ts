import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateuserRoutingModule } from './updateuser-routing.module';
import { UpdateuserComponent } from './pages/updateuser/updateuser.component';


@NgModule({
  declarations: [
    UpdateuserComponent
  ],
  imports: [
    CommonModule,
    UpdateuserRoutingModule
  ]
})
export class UpdateuserModule { }
