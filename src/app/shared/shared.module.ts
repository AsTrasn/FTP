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

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderuserComponent,
    TableComponent,
    OrderlistPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    RouterModule,
    MatPaginatorModule,
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
