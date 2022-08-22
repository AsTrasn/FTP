import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  callback:EventEmitter<any> = new EventEmitter<any>()
  constructor() { }
}
