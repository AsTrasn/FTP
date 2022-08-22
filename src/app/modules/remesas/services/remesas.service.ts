import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RemesasService {

  private readonly URL = environment.api

  constructor(private httpClient: HttpClient) {

  }

  getAllRem$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/remesas`)
    .pipe(
      catchError((err) => {
        console.log(`Ha ocurrido un error ${err.status} ${err.statusText}`)
        return of([])
      })
    )
  }
}
