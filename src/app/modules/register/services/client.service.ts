import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly URL = environment.api

  constructor(private httpClient: HttpClient, private cookie: CookieService) { }

  getAllClients$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/remittances/listCodeClient`)
    .pipe(
      map((response:any) =>{
        return response
      })
    )
  }
}
