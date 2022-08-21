import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateuserComponent } from './pages/updateuser/updateuser.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateuserComponent,
    outlet: 'child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateuserRoutingModule { }
