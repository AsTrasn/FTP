import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  constructor(private remesaSvc: RemesasService, private sendDataSvc: SendDataService) { }

  ngOnInit(): void {
    this.loadData(null, this.clientId)

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
          this.remesaData = this.loadData(response, this.clientId)
        }else{
          try {
            this.loadData(null, this.clientId)
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

  loadData(remname:string | null = null, clientId: string | null = null): void{
   this.remesaSvc.getAllRem$(remname, clientId)
    .subscribe((response: RemesaElement) => {
      let data: any
      data = response.Remesas
      this.remesaData = data
    })
  }
}
