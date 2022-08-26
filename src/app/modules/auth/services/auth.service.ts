import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { BehaviorSubject, map, Observable, tap } from 'rxjs'
import { UserResponse } from '@core/models/user.interface'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false)
  private isAdmin = new BehaviorSubject<boolean>(false)

  constructor(private httpClient: HttpClient, private cookie: CookieService, private router: Router) { }

  private readonly URL = environment.api
 
  login(username:string, password:string): Observable<any>{
    const body = {username, password}
    return this.httpClient.post(`${this.URL}/auth/sign/`, body)
    .pipe(
      tap((responseOk:any) => {
        const { accessToken, username, roles, clientCodes, tokenType } = responseOk
        const userInfo = JSON.stringify({username, roles, clientCodes, tokenType})
        if(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_MODERATOR')) {
          this.isAdmin.next(true)
        }
        this.cookie.set('token', accessToken, 4, '/')
        this.cookie.set('user_info', userInfo, 4, '/')
        this.router.navigate(['/'])
      })
    )
  }

  get Admin(): Observable<boolean>{
    return this.isAdmin.asObservable()
  }

  logout(): void{
    this.cookie.delete('token')
    this.cookie.delete('user_info')
    this.router.navigate(['/auth'])
    this.isAdmin.next(false)
  }

  getRole(){
    let userInfo = this.cookie.get('user_info')

    if(userInfo) {
      let newInfo = JSON.parse(userInfo && userInfo)      
      const { roles } = newInfo
      return roles
    }

    return false
  }

  getUsernaeme(){
    let userInfo = this.cookie.get('user_info')

    if(userInfo) {
      let newInfo = JSON.parse(userInfo && userInfo)      
      const { username } = newInfo
      return username
    }

    return 'Desconocido'
  }
}
