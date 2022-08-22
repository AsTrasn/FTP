import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { RemesaElement } from '@core/models/remesa.interface';
import { RemesasService } from '@modules/remesas/services/remesas.service';
import { SendDataService } from '@shared/services/send-data.service';
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
  clientId:string = ''

  listObservers$: Array<Subscription> = []

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor(private remesaSvc: RemesasService, private sendDataSvc: SendDataService) { }

  ngOnInit(): void {
    this.loadData(null, this.clientId)
    console.log(this.clientId)

    const observer1$:Subscription = this.sendDataSvc.callback.subscribe(
      (response:string) => {
        this.clientId = response
        this.loadData(null, this.clientId)
      }
    )

    const observer2$:Subscription = this.sendDataSvc.searchRem.subscribe(
      async (response:string) =>{
        console.log('Recibiendo busqueda', response)
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

    const observer3$:Subscription = this.sendDataSvc.size.subscribe(
      (response) => {
        try {
          if(response && response !== undefined){
            console.log(response.pageIndex)
            try{
              this.remesaData = this.loadData(null, this.clientId, response.pageIndex)
            }catch(error){
              console.log('b')
            }
          }else{
            this.remesaData = this.loadData(null, this.clientId, 0)
            console.log('a')
          }
        } catch (error) {
          return error
        }
      }
    )

    this.listObservers$ = [observer1$, observer2$, observer3$]
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(subs => subs.unsubscribe)
  }

  loadData(remname:string | null = null, clientId: string | null = null, page:number | null = 0): void{
   this.remesaSvc.getAllRem$(remname, clientId, page)
    .subscribe((response: RemesaElement) => {
      let data: any
      data = response.Remesas
      this.remesaData = data
      console.log(response)
      this.length = response.totalItems
    })
  }
}
