# RxJS Debugger

[![Build Status](https://filipemendes1994.visualstudio.com/rxjs-debugger/_apis/build/status/filipemendes1994.rxjs-debugger?branchName=master)](https://filipemendes1994.visualstudio.com/rxjs-debugger/_build/latest?definitionId=1&branchName=master)

## Demo
The demo app in this repo is available in repo's [GitHub pages](https://filipemendes1994.github.io/rxjs-debugger).

## What is it?

`rxjs-debugger` is an alternative and easy way to debug RxJS Observables and its subscriptions.
Disclaimer: don't use this tool in production. This is a very experimental exercise.

### Why might you need it?

The usual approach to debug RxJS-based code involves sprinkling `do` or custom operators. Then, logging is made available to notice an observable is subscribed and unsubscribed.

While debugging Angular applications with hundreds of observables, I found these methods very time-consuming, since we have to pipe every single observable we want to track. Badly-managed RxJS Subscriptions can affect application's performance widely and sail aimlessly can be very painfull.

You can find more info about this package in this Medium Post
(https://medium.com/@filipemendes_73527/rxjs-debugger-an-alternative-way-to-debug-rxjs-observables-eb6d4b7fef6c)

I'm sure you also thinks the same, and this is a package you might need.

## Install

Install the package using NPM:

```
npm install --save-dev rxjs-debugger
```

And add only the following code to `main.ts`,

```ts
import { Observable } from "rxjs";
import { RxJSDebugger } from "rxjs-debugger";
RxJSDebugger.init(Observable);
```

Or `require` the module to use with CommonJS bundler:

```js
const { RxJSDebugger } = require("rxjs-debugger");
const { Observable } = require("rxjs");
RxJSDebugger.init(Observable);
```

## Core concepts

`rxjs-debugger` adds logic to Observable's prototype `subscribe` method that allow us to monitorize the subscription and unsubscription calls of RxJS Observables and its extended classes (EventEmitter, Subject, BehaviorSubject...).

### Module API

The exported `RxJSDebugger` object exposes the following API:

```js
export declare type SubscriptionsMap = { [key: string]: string[] };
export declare type ClassName = string;
export declare type ObservableDef = typeof Observable;

export const RxJSDebugger: {
  valueChanges: Subject<SubscriptionsMap>;
  obSubscribed$: Subject<ClassName>,
  obUnsubscribed$: Subject<ClassName>,

  addOnSubscribeLogic: (fn: Function) => void,
  addOnUnsubscribeLogic: (fn: Function) => void,

  clearOnSubscribeLogic: () => void,
  clearOnUnsubscribeLogic: () => void,

  setTargettedClasses: (targettedClasses: ClassName[]) => void,

  subscriptionsMap: () => SubscriptionsMap,
  openedSubscriptionsCount: () => number,
  clearSubscriptionsMap: () => void,

  init: (
    observableDef: ObservableDef,
    targettedClasses?: ClassName[],
    onSubscribeFn?: () => void,
    onUnsubscribeFn?: () => void
  ) => void
}
```

Unlike other RxJS debugging libraries, this one doesn't force you to change every observable you want to monitorize. Calling `.init()` method is enough to trigger the debugging mode. After that, when an observable is subscribed, a new uuid is pushed to subscriber's class entry in `subscriptionsMap`. It allows us to know in realtime how many subscriptions exist in each class.

### Window API

More than that, developer can access the tracked data via browser's console, using `window.subscriptionsMap`.
