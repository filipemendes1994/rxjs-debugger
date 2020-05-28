import { Component, ViewChild, ElementRef } from '@angular/core';
import { RxJSMonitor } from 'rxjs-monitor';
import { FakePipe } from './pipes/fake.pipe';
import { FakeService } from './services/fake.service';
import { FakeDirective } from './directives/fake.directive';
import { AvailableSource } from './app.constants';
import { timer } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  AvailableSource = AvailableSource;

  fakePipe: FakePipe = new FakePipe();
  fakeDirective: FakeDirective = new FakeDirective();

  @ViewChild('console') console: ElementRef;

  private readonly consoleEntryPrefix = '>>> ';

  constructor(private fakeService: FakeService) { }

  createFakeSubscription() {
    timer(1000, 2000).subscribe();
  }

  printSubscriptionsMap() {
    this.consoleLogger(new JsonPipe().transform(RxJSMonitor.subscriptionsMap()));
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

  consoleLogger(entry: string) {
    this.console.nativeElement.innerHTML += `<div>${this.consoleEntryPrefix}${entry}</div>`;
  }

  consoleClear() {
    this.console.nativeElement.innerHTML = '';
  }
}
