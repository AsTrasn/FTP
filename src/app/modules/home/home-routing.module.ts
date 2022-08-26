import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '@core/guards/role.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/remesas/remesas.module').then(m => m.RemesasModule)
  },
  {
    path: 'register',
    loadChildren: () => import('@modules/register/register.module').then(m => m.RegisterModule),
    data: {
      role: ['ROLE_ADMIN', 'ROLE_MODERATOR']
    },
    canActivate: [RoleGuard]
  },
  {
    path: 'actualizar',
    loadChildren: () => import('@modules/updateuser/updateuser.module').then(m => m.UpdateuserModule),
    data: {
      role: ['ROLE_ADMIN', 'ROLE_MODERATOR']
    },
    canActivate: [RoleGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
