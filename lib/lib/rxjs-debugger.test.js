const { RxJSDebugger } = require('./rxjs-debugger');
const { Observable, Subject } = require('rxjs');
const { v4: uuid } = require('uuid');

/** Test addOnSubscribeLogic */
test('should not add logic to subscribe', () => {
  RxJSDebugger.addOnSubscribeLogic();
  expect(RxJSDebugger.onSubscribeFns[0]).toBeUndefined();
});

test('should add logic to subscribe', () => {
  const mockFn = jest.fn();
  RxJSDebugger.addOnSubscribeLogic(mockFn);
  expect(RxJSDebugger.onSubscribeFns[0]).toBe(mockFn);
});

/** Test clearOnSubscribeLogic */
test('should clear subscribe logic array', () => {
  RxJSDebugger.clearOnSubscribeLogic();
  expect(RxJSDebugger.onSubscribeFns.length).toBe(0);
});

/** Test addOnUnsubscribeLogic */
test('should not add logic to unsubscribe', () => {
  RxJSDebugger.addOnUnsubscribeLogic();
  expect(RxJSDebugger.onUnsubscribeFns[0]).toBeUndefined();
});

test('should add logic to unsubscribe', () => {
  const mockFn = jest.fn();
  RxJSDebugger.addOnUnsubscribeLogic(mockFn);
  expect(RxJSDebugger.onUnsubscribeFns[0]).toBe(mockFn);
});

/** Test clearOnUnsubscribeLogic */
test('should clear unsubscribe logic array', () => {
  RxJSDebugger.clearOnUnsubscribeLogic();
  expect(RxJSDebugger.onUnsubscribeFns.length).toBe(0);
});

/** Test get subscriptions map */
test('should get subscriptions map', () => {
  window.subscriptionsMap = { 'mockClassName': [new uuid()] };
  expect(RxJSDebugger.subscriptionsMap()).toStrictEqual(window.subscriptionsMap);
});

/** Test get subscriptions count */
test('should get subscriptions count', () => {
  expect(RxJSDebugger.openedSubscriptionsCount()).toBe(1);
});

/** Test set subscriptions count */
test('should not set targetted classes', () => {
  RxJSDebugger.setTargettedClasses();
  expect(RxJSDebugger.targettedClasses).toBeUndefined();
});

test('should set targetted classes', () => {
  const mockClasses = ['AppComponent'];
  RxJSDebugger.setTargettedClasses(mockClasses);
  expect(RxJSDebugger.targettedClasses).toBe(mockClasses);
  RxJSDebugger.setTargettedClasses([]);
  expect(RxJSDebugger.targettedClasses).toStrictEqual([]);
  RxJSDebugger.setTargettedClasses();
  expect(RxJSDebugger.targettedClasses).toBeUndefined();
});

test('should extend subscribe method', () => {
  RxJSDebugger.init(Observable);
  expect(JSON.stringify("" + Observable.prototype.subscribe)).toMatch(/originalSubscribeFn/i);
  expect(RxJSDebugger.subscriptionsMap()).toStrictEqual({});
});

test('should have subjects', () => {
  expect(RxJSDebugger.valueChanges).toEqual(new Subject());
  expect(RxJSDebugger.obSubscribed$).toEqual(new Subject());
  expect(RxJSDebugger.obUnsubscribed$).toEqual(new Subject());
});


