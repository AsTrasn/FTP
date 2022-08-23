import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  myControl = new FormControl<string | any>('');
  options: any[] = this.data;
  filteredOptions!: Observable<any[]>;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name;
    const filter = this.options.filter(option => option.clienteNumero.includes(filterValue));
    console.log(filter)
    return filter
  }

  close(){
    this.dialog.closeAll()
  }

}
