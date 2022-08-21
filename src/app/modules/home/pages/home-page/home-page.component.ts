import { Component, OnInit } from '@angular/core'
import { RemesaElement } from '@core/models/remesa.interface'
import * as dataRaw from '../../../../data/remesas.json'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  remesaData:Array<RemesaElement> = []
  constructor() { }

  ngOnInit(): void {
    const { data }:any = (dataRaw as any).default
    this.remesaData = data
  }

}
