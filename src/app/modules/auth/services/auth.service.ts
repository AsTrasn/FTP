import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { BehaviorSubject, map, Observable, tap } from 'rxjs'
import { UserResponse } from '@core/models/user.interface'
import { JwtHelperService } from '@auth0/angular-jwt'
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
        this.cookie.set('token', accessToken, 4, '/')
        this.cookie.set('user_info', userInfo, 4, '/')
        this.router.navigate(['/'])
      })
    )
  }

  logout(): void{
    this.cookie.delete('token')
    this.cookie.delete('user_info')
    this.router.navigate(['/auth'])
  }
}
