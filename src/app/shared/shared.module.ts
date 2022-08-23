import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderuserComponent } from './components/headeruser/headeruser.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { RouterModule } from '@angular/router';
import { OrderlistPipe } from './pipes/orderlist.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog'

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderuserComponent,
    TableComponent,
    OrderlistPipe,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    RouterModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    HeaderuserComponent,
    TableComponent,
    OrderlistPipe
  ]
})
export class SharedModule { }
