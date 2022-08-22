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


  remesaData!:RemesaElement[]
  clientId:string = ''

  listObservers$: Array<Subscription> = []

  constructor(private remesaSvc: RemesasService, private sendDataSvc: SendDataService) { }

  ngOnInit(): void {
    this.loadData()

    const observer1$:Subscription = this.sendDataSvc.callback.subscribe(
      (response:string) => {
        this.clientId = response
      }
    )

    const observer2$:Subscription = this.sendDataSvc.searchRem.subscribe(
      async (response:string) =>{
        console.log('Recibiendo busqueda', response)
        if(response !== ''){
          this.remesaData = [] //TODO: Si el response es diferente vacio hace la peticion para buscar las remesa y las asigna al remesaData.
          // this.remesaData = response de busqueda por remesa
        }else{
          try {
            this.loadData()
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

  loadData(): void{
   this.remesaSvc.getAllRem$()
    .subscribe((response: RemesaElement[]) => {
      this.remesaData = response
    })
  }
}
