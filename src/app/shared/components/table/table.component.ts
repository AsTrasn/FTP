import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RemesaElement } from '@core/models/remesa.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() dataTable:Array<RemesaElement> = []
  @Input() client:string = ''

  displayedColumns: string[] = ['id', 'customer', 'operation', 'remesa', 'manifiest', 'date', 'actions'];
  selection = new SelectionModel<RemesaElement>(true, []);

  listObservers$:Array<Subscription> = []

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor() {}

  ngOnInit(): void {

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  downloadRemesa(id:any): void{
    console.log(id)
  }
}
