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

  remesaData!:any
  clientId:any = ''

  listObservers$: Array<Subscription> = []

  // MatPaginator Inputs
  length:number = 0;
  pageSize:number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor(private remesaSvc: RemesasService, private sendDataSvc: SendDataService, private cookie: CookieService) { }

  ngOnInit(): void {
    let clientList:any = this.cookie.get('user_info')
    clientList = JSON.parse(clientList)
    this.clientId = Object.values(clientList.clientCodes[0])[0]
    
    this.loadData(null, this.clientId, 0)
    

    //Listening ClientId
    const observer1$:Subscription = this.sendDataSvc.callback.subscribe(
      (response:string) => {
        this.clientId = response
        this.loadData(null, this.clientId)
      }
    )

    //Listening search
    const observer2$:Subscription = this.sendDataSvc.searchRem.subscribe(
      async (response:string) =>{
        if(response !== ''){
          this.remesaData = this.loadData(response, this.clientId, 0)
        }else{
          try {
            this.loadData(null, this.clientId, 0)
          } catch (error) {
            console.log(error)
          }
        }
      }
    )

    // const observer3$:Subscription = this.sendDataSvc.date.subscribe(
    //   (response) =>{
    //     if(response.star && response.end){
    //       let start = response.star?.toISOString().split('T')[0]
    //       let end = response.end?.toISOString().split('T')[0]
    //       this.remesaData = this.loadData(null, this.clientId, 0, start, end)
    //       return response
    //     }
    //   }
    // )

    this.listObservers$ = [observer1$, observer2$]
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(subs => subs.unsubscribe)
  }

  loadData(remname:string | null = null, clientId: string | null = null, page:number | null = 0, start:string | null = null, end:string | null = null): void{
   this.remesaSvc.getAllRem$(remname, clientId, page, start, end)
    .subscribe((response: RemesaElement) => {
      let data: any
      data = response.Remesas
      this.remesaData = data
      // console.log(response)
      this.length = response.totalItems
    })
  }
}
