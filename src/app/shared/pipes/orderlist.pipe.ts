import { Pipe, PipeTransform } from '@angular/core';
import { RemesaElement } from '@core/models/remesa.interface';

@Pipe({
  name: 'orderlist'
})
export class OrderlistPipe implements PipeTransform {

  transform(value: RemesaElement, ...args: unknown[]): unknown {
    return [];
  }

}
