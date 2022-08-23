import { SelectionModel } from '@angular/cdk/collections'
import { Component, Input, OnInit } from '@angular/core'
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
export class TableComponent implements OnInit {

  @Input() dataTable:Array<RemesaElement> = []
  @Input() client:string = ''
  @Input() start:Date| null | undefined = null
  @Input() end:Date | null | undefined = null

  displayedColumns: string[] = ['id', 'customer', 'operation', 'No. remesa', 'destino', 'conductor', 'date', 'eco', 'etf', 'actions']
  selection = new SelectionModel<RemesaElement>(true, [])

  listObservers$:Array<Subscription> = []
  url: any

  constructor(private remSvc: RemesasService) {}

  ngOnInit(): void {
  }

  downloadRemesa(element:any): void{
    const { documentoStatus, Fecha_Cumplido, nombreRemesa} = element
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
            text: `La remesa ${nombreRemesa} no tiene un documento asociado o la petición tomo mucho tiempo, si la petición tomo mucho tiempo por favor intentelo luego`,
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
