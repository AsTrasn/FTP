import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private readonly URL = environment.api
  
  constructor(private httpClient: HttpClient) { }

  updatePassword$(username: string, password: string): Observable<any>{
    let body = {username, password}
    console.log(body)

    return this.httpClient.post(`${this.URL}/auth/RecoveryPassword/`, body, {responseType: 'text'})
  }
}
