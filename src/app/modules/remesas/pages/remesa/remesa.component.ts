import { Component, OnInit } from '@angular/core';
import { RemesaElement } from '@core/models/remesa.interface'
import * as dataRaw from '../../../../data/remesas.json'

@Component({
  selector: 'app-remesa',
  templateUrl: './remesa.component.html',
  styleUrls: ['./remesa.component.css']
})
export class RemesaComponent implements OnInit {
  remesaData:Array<RemesaElement> = []
  constructor() { }

  ngOnInit(): void {
    const { data }:any = (dataRaw as any).default
    this.remesaData = data
  }
}
