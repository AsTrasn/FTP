import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemesasRoutingModule } from './remesas-routing.module';
import { RemesaComponent } from './pages/remesa/remesa.component';
import { TableComponent } from '@shared/components/table/table.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    RemesaComponent,
  ],
  imports: [
    CommonModule,
    RemesasRoutingModule,
    SharedModule
  ]
})
export class RemesasModule { }
