import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RemesaElement } from '@core/models/remesa.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() dataTable:Array<RemesaElement> = []

  displayedColumns: string[] = ['id', 'customer', 'operation', 'remesa', 'manifiest', 'date', 'actions'];
  // dataSource = new MatTableDataSource<RemesaElement>(this.dataTable);
  selection = new SelectionModel<RemesaElement>(true, []);

  constructor() {}

  ngOnInit(): void {
    console.log(this.dataTable)
  }

  downloadRemesa(id:any): void{
    console.log(id)
  }

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataTable.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.dataTable);
  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: RemesaElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ID + 1}`;
  // }
}
