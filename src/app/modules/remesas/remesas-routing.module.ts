import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemesaComponent } from './pages/remesa/remesa.component';

const routes: Routes = [
  {
    path: '',
    component: RemesaComponent,
    outlet: 'child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemesasRoutingModule { }
