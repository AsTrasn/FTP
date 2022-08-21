import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderuserComponent } from './components/headeruser/headeruser.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderuserComponent,
    TableComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    TableComponent,
    HeaderuserComponent
  ]
})
export class SharedModule { }
