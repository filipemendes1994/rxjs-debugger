import { Directive } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: '[appFakeDirective]'
})
export class FakeDirective {
  createFakeSubscription() {
    timer(1000, 2000).subscribe();
  }
}
