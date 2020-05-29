import { Injectable } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeService {
  private readonly subscriptionFinisher$: Subject<void> = new Subject();

  createFakeSubscription() {
    timer(1000, 2000)
      .pipe(takeUntil(this.subscriptionFinisher$))
      .subscribe();
  }

  cancelSubscriptions() {
    this.subscriptionFinisher$.next();
  }
}
