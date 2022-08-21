import { Component, Input, OnInit } from '@angular/core';
import { RemesaElement } from 'src/app/models/remesa.interface';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'CUSTOMER', 'OPERATION', 'REMESA', 'MANIFIESTO', 'DATE'];
  clickedRows = new Set<RemesaElement>();

  @Input() data: any

  constructor() { }

  ngOnInit(): void {

  }

}
