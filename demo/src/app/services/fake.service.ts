import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeService {
  createFakeSubscription() {
    timer(1000, 2000).subscribe();
  }
}
