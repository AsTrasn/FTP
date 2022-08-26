import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authSvc:AuthService, private router: Router){}

  canActivate( route: ActivatedRouteSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route);
  }

  checkUserLogin(route: ActivatedRouteSnapshot){
    let roles =  this.authSvc.getRole()
    
    if(roles){
      let checkRole = route.data["role"].map((role: any) => {
        if(roles.includes(role)){
          return true
        }else{
          this.router.navigate(['/', 'not-role'])
          return false
        }
      })
      return checkRole
    }
    
    return false
  }
  
}
