import { Component, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RxJSDebugger } from 'rxjs-debugger';

import { FakePipe } from './pipes/fake.pipe';
import { FakeService } from './services/fake.service';
import { FakeDirective } from './directives/fake.directive';
import { AvailableSource } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  AvailableSource = AvailableSource;

  fakePipe: FakePipe = new FakePipe();
  fakeDirective: FakeDirective = new FakeDirective();

  @ViewChild('console') console: ElementRef;

  private readonly subscriptionFinisher$: Subject<void> = new Subject();
  private readonly consoleEntryPrefix = '>>> ';

  constructor(private fakeService: FakeService) { }

  /**
   * Adds initial message to console
   *
   * @memberof AppComponent
   */
  ngAfterViewInit() {
    this.consoleLogger(
      '<span style="color: green;">\n' +
      '/*\n' +
      `Don't forget!\n` +
      'You can use <b>window.subscriptionsMap</b>\n' +
      `on browser's console to get subscriptions map\n` +
      `*/</span>`
    )

    RxJSDebugger.valueChanges
      .subscribe(() => this.consoleLogger('Subscription map value changed!'));

    RxJSDebugger.obSubscribed$
      .subscribe(className => this.consoleLogger(`Observable subscribed on ${className}!`));

    RxJSDebugger.obUnsubscribed$
      .subscribe(className => this.consoleLogger(`Observable unsubscribed on ${className}!`));
  }

  ngOnDestroy() {
    this.subscriptionFinisher$.next();
    this.subscriptionFinisher$.complete();
  }

  createFakeSubscription() {
    timer(1000, 2000)
      .pipe(takeUntil(this.subscriptionFinisher$))
      .subscribe();
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
  }

  printSubscriptionsMap() {
    this.consoleLogger('\n' + new JsonPipe().transform(RxJSDebugger.subscriptionsMap()));
  }

  printSubscriptionsCount() {
    this.consoleLogger(`Subscription Count: ${RxJSDebugger.openedSubscriptionsCount()}`);
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
    this.console.nativeElement.innerHTML +=
      `<div><span style="color: green">${this.consoleEntryPrefix}</span>${entry}</div>`;
    this.console.nativeElement.scroll({
      top: this.console.nativeElement.scrollHeight
    });
  }
}
