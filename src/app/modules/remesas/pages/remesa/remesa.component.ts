import { Component, OnDestroy, OnInit } from '@angular/core';
import { RemesaElement } from '@core/models/remesa.interface'
import { RemesasService } from '@modules/remesas/services/remesas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-remesa',
  templateUrl: './remesa.component.html',
  styleUrls: ['./remesa.component.css']
})
export class RemesaComponent implements OnInit, OnDestroy {

  remesaData:any

  listObservers$: Array<Subscription> = []
  constructor(private remesaSvc: RemesasService) { }

  ngOnInit(): void {
    this.remesaSvc.getAllRem$()
    .subscribe((response:RemesaElement) => {
      this.remesaData = response
      console.log(response)
    })
  }

  ngOnDestroy(): void {

  }
}
