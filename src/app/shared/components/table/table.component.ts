import { SelectionModel } from '@angular/cdk/collections'
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
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
  @Input() start:Date| null | undefined = null
  @Input() end:Date | null | undefined = null
  @Input() spinner:boolean = false
  @Input() remSeached:string | null = null

  displayedColumns: string[] = ['id', 'customer', 'operation', 'No. remesa', 'destino', 'conductor', 'date', 'eco', 'etf', 'actions']
  dataSource = new MatTableDataSource<any>(this.dataTable);
  selection = new SelectionModel<RemesaElement>(true, [])
  query:string | null = null

  listObservers$:Array<Subscription> = []
  url: any

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private remSvc: RemesasService) {}

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource<any>(this.dataTable);
    this.dataSource.paginator = this.paginator;
    this.spinner = this.spinner
  }

  ngOnInit(): void {
  }

  searched(column:any):void{
    this.query = this.remSeached
    this.query = null
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
            text: `La remesa ${nombreRemesa} no tiene un documento asociado o la petición tomo mucho tiempo, si la petición tomo mucho tiempo por favor inténtelo luego`,
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
