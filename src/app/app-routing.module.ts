import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { SessionGuard } from "@core/guards/session.guard"
import { HomePageComponent } from "@modules/home/pages/home-page/home-page.component"
import { RoleGuard } from './core/guards/role.guard';

const ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: HomePageComponent,
    loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule),
    canActivate: [SessionGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})


export class AppRoutingModule{}
