import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { RemesaElement } from '@core/models/remesa.interface'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
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
    // .pipe(
    //   map((dataRaw) => {
    //     return dataRaw
    //   })
    // )
  }
}
