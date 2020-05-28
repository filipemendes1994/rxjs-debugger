import { Pipe, PipeTransform } from '@angular/core';
import { timer } from 'rxjs';

@Pipe({
  name: 'fakePipe'
})
export class FakePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

  createFakeSubscription() {
    timer(1000, 2000).subscribe();
  }
}
