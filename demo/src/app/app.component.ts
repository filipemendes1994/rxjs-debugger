import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RxJSMonitor } from 'rxjs-monitor';

import { FakePipe } from './pipes/fake.pipe';
import { FakeService } from './services/fake.service';
import { FakeDirective } from './directives/fake.directive';
import { AvailableSource } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  AvailableSource = AvailableSource;

  fakePipe: FakePipe = new FakePipe();
  fakeDirective: FakeDirective = new FakeDirective();

  @ViewChild('console') console: ElementRef;

  private readonly subscriptionFinisher$: Subject<void> = new Subject();
  private readonly consoleEntryPrefix = '>>> ';

  constructor(private fakeService: FakeService) { }

  ngOnDestroy() {
    this.subscriptionFinisher$.next();
    this.subscriptionFinisher$.complete();
  }

  createFakeSubscription() {
    timer(1000, 2000)
      .pipe(takeUntil(this.subscriptionFinisher$))
      .subscribe();
  }

  printSubscriptionsMap() {
    this.consoleLogger('\n' + new JsonPipe().transform(RxJSMonitor.subscriptionsMap()));
  }

  addSubscription(source: AvailableSource) {
    switch(source) {
      case AvailableSource.COMPONENT:
        this.createFakeSubscription();
        break;
      case AvailableSource.PIPE:
        this.fakePipe.createFakeSubscription();
        break;
      case AvailableSource.DIRECTIVE:
        this.fakeDirective.createFakeSubscription();
        break;
      case AvailableSource.SERVICE:
        this.fakeService.createFakeSubscription();
        break;
    }

    this.consoleLogger(`New subscription was added to ${source}`);
  }

  printSubscriptionsCount() {
    this.consoleLogger(`Subscription Count: ${RxJSMonitor.openedSubscriptionsCount()}`);
  }

  cancelSubscriptions() {
    this.subscriptionFinisher$.next();
    this.fakePipe.cancelSubscriptions();
    this.fakeDirective.cancelSubscriptions();
    this.fakeService.cancelSubscriptions();

    this.consoleLogger('Subscriptions canceled');
  }

  consoleClear() {
    this.console.nativeElement.innerHTML = '';
    this.consoleLogger('Console cleared but subscriptions keep alive!');
  }

  consoleLogger(entry: string) {
    this.console.nativeElement.innerHTML += `<div>${this.consoleEntryPrefix}${entry}</div>`;
    this.console.nativeElement.scroll({
      top: this.console.nativeElement.scrollHeight
    });
  }
}
