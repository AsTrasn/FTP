import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {

  }

  downloadRemesa(id:any): void{
    console.log(id)
  }
}
