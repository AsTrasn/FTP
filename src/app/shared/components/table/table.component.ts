import { SelectionModel } from '@angular/cdk/collections'
import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { RemesaElement } from '@core/models/remesa.interface'
import { RemesasService } from '@modules/remesas/services/remesas.service'
import { SendDataService } from '@shared/services/send-data.service'
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() dataTable:Array<RemesaElement> = []
  @Input() client:string = ''
  @Input() pageEvent:any

  displayedColumns: string[] = ['id', 'customer', 'operation', 'No. remesa', 'destino', 'conductor', 'date', 'eco', 'etf', 'actions']
  selection = new SelectionModel<RemesaElement>(true, [])

  listObservers$:Array<Subscription> = []
  url: any

  // // MatPaginator Inputs
  // length = 100
  // pageSize = 10
  // pageSizeOptions: number[] = [5, 10, 25, 100]

  // // MatPaginator Output
  // pageEvent!: PageEvent

  constructor(private remSvc: RemesasService, private dataSend: SendDataService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes:any) {
    try {
      if(changes.pageEvent){
        this.dataSend.size.emit(changes.pageEvent.currentValue)
      }
      // console.log(changes.pageEvent.currentValue)
    } catch (error) {
      return error
    }
  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  //   }
  // }

  downloadRemesa(element:any): void{
    const { documentoStatus, Fecha_Cumplido} = element
    let newDate = Fecha_Cumplido.split('-')
    let date = {year: newDate[0], month: newDate[1]}
    if(parseInt(date.month) < 10){
      let parseMonth = date.month.slice(1)
      date.month = parseMonth
    }

    this.remSvc.downloadPDF$(documentoStatus, date.month, date.year).subscribe(
      res => {
        if(!res){
          Swal.fire({
            title: 'Error!',
            text: 'La remesa no tiene un documento asociado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
          return res
        }
        window.open(res[0].url)
      }
    )
  }
}
