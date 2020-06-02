const { RxJSDebugger } = require('./rxjs-debugger');
const { registerNewSubscription, unregisterSubscription } = require('./handle-subscriptions');
const { take, finalize, tap } = require('rxjs/operators');

window.subscriptionsMap = {};

/** Test registerNewSubscription */
test('should register and unregister subscription', done => {
  const mockClassName = 'AppComponent';

  RxJSDebugger.valueChanges
    .pipe(
      take(2),
      finalize(() => done())
    ).subscribe(value => expect(value).toStrictEqual(window.subscriptionsMap));

  RxJSDebugger.obSubscribed$
    .pipe(take(1))
    .subscribe(value => expect(value).toBe(mockClassName));

  RxJSDebugger.obUnsubscribed$
    .pipe(take(1))
    .subscribe(value => expect(value).toBe(mockClassName));

  const id = registerNewSubscription(mockClassName);
  expect(id).toBeDefined();
  expect(window.subscriptionsMap[mockClassName]).toBeDefined();

  expect(unregisterSubscription(id, mockClassName)).not.toBeDefined();
  expect(window.subscriptionsMap[mockClassName]).not.toBeDefined();
});
