import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RemesasRoutingModule } from './remesas-routing.module'
import { RemesaComponent } from './pages/remesa/remesa.component'
import { SharedModule } from '@shared/shared.module'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatNativeDateModule } from '@angular/material/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    RemesaComponent,
  ],
  imports: [
    CommonModule,
    RemesasRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RemesasModule { }
