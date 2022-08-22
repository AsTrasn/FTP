import { HttpClient, HttpHeaders } from '@angular/common/http'
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

  getAllRem$(remname:string | null, clientId:string | null, page: number | null = 0): Observable<any>{
    let body = remname ? { clienteNumero: clientId, nombreRemesa: remname } : { clienteNumero: clientId }

    return this.httpClient.post(`${this.URL}/auth/List?page=${page}&size=10`, body)
    .pipe(
      map(res => {
        return res
      }),
      catchError((err) => {
        return of([])
      })
    )
  }

  downloadPDF$(name:string, month:string, year:string): Observable<any>{
    let body = { remesa: name, mes: month, año: year }
    return this.httpClient.post(`${this.URL}/auth/files`, body)
    .pipe(
      map((res:any) =>{
        return res
      })
    )
  }
}
