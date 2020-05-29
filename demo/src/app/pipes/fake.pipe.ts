import { Pipe, PipeTransform } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Pipe({
  name: 'fakePipe'
})
export class FakePipe implements PipeTransform {

  private readonly subscriptionFinisher$: Subject<void> = new Subject();

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

  createFakeSubscription() {
    timer(1000, 2000)
      .pipe(takeUntil(this.subscriptionFinisher$))
      .subscribe();
  }

  cancelSubscriptions() {
    this.subscriptionFinisher$.next();
  }
}
