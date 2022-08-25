import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UpdateuserRoutingModule } from './updateuser-routing.module'
import { UpdateuserComponent } from './pages/updateuser/updateuser.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    UpdateuserComponent
  ],
  imports: [
    CommonModule,
    UpdateuserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UpdateuserModule { }
