import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/remesas/remesas.module').then(m => m.RemesasModule)
  },
  {
    path: 'register',
    loadChildren: () => import('@modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'actualizar',
    loadChildren: () => import('@modules/updateuser/updateuser.module').then(m => m.UpdateuserModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
