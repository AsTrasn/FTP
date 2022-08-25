import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { RemesaElement } from '@core/models/remesa.interface';
import { RemesasService } from '@modules/remesas/services/remesas.service';
import { SendDataService } from '@shared/services/send-data.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-remesa',
  templateUrl: './remesa.component.html',
  styleUrls: ['./remesa.component.css']
})
export class RemesaComponent implements OnInit, OnDestroy {
  // Range datepicker
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  remesaData!: any
  filter:any = null
  clientId: any = ''
  spinner: boolean = false

  listObservers$: Array<Subscription> = []

  constructor(private remesaSvc: RemesasService, private sendDataSvc: SendDataService, private cookie: CookieService) { }

  ngOnInit(): void {
    let clientList: any = this.cookie.get('user_info')
    clientList = JSON.parse(clientList)
    this.clientId = Object.values(clientList.clientCodes[0])[0]

    this.loadData(null, this.clientId, 0)


    //Listening ClientId
    const observer1$: Subscription = this.sendDataSvc.callback.subscribe(
      (response: string) => {
        this.clientId = response
        this.loadData(null, this.clientId)
      }
    )

    //Listening search
    const observer2$: Subscription = this.sendDataSvc.searchRem.subscribe(
      async (response: string) => {
        if (response !== '') {
          response.toLocaleUpperCase()
          
          if(this.remesaData.length === 0){
            this.filter = this.remesaData
          }else{
            this.filter = this.remesaData.filter(
              (rem:any) => rem.nombreRemesa.includes(response)
            )
          }
        } else {
          try {
            this.filter = null
            this.loadData(null, this.clientId, 0)
          } catch (error) {
            console.log(error)
          }
        }
      }
    )

    this.listObservers$ = [observer1$, observer2$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(subs => subs.unsubscribe)
  }

  loadData(remname: string | null = null, clientId: string | null = null, page: number | null = 0, start: string | null = null, end: string | null = null): void {
    this.remesaSvc.getAllRem$(remname, clientId, page, start, end)
      .subscribe((response: RemesaElement) => {
        let data: any
        data = response
        this.remesaData = data
        this.spinner = false
        console.log('rendering')
      })
  }
}
