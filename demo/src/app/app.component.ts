import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    timer(1000, 2000)
      .pipe(
        tap(x => console.log(x)),
        finalize(() => console.log('acabou'))
      )
      .subscribe();

    timer(1000, 2000)
      .subscribe(() => console.log('??? emitiu'));

    this.subscribeSomething();

    this.getObservable().subscribe();
  }

  subscribeSomething() {
    timer(1000, 2000)
      .subscribe(() => console.log('??? emitiu'));
  }

  getObservable() {
    return timer(1000, 2000);
  }
}
