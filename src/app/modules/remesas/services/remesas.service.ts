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

  getAllRem$(remname:string | null, clientId:string | null, page: number | null = 0, start:string | null = null, end:string | null = null): Observable<any>{
    let body = remname ? { clienteNumero: clientId, nombreRemesa: remname } : { clienteNumero: clientId }

    let url = start && end ? `${this.URL}/remittances/list?page=${page}&size=10&date1=${start}&date2=${end}` : `${this.URL}/remittances/list?page=${page}&size=10`

    return this.httpClient.post(url, body)
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
    return this.httpClient.post(`${this.URL}/remittance/files`, body)
    .pipe(
      map((res:any) =>{
        return res
      })
    )
  }
}
