# RxJS Debugger

## Demo
The demo app in this repo is available in repo's [GitHub pages](https://filipemendes1994.github.io/rxjs-debugger).

## What is it?

`rxjs-debugger` is an alternative and easy way to debug RxJS Observables and its subscriptions.

### Why might you need it?

The usual approach to debug RxJS-based code involves sprinkling `do` or custom operators. Then, logging is made available to notice an observable is subscribed and unsubscribed.

While debugging Angular applications with hundreds of observables, I found these methods very time-consuming and boring, since we have to pipe every single observable we want to track. Bad-managed RxJS Subscriptions can affect application's performance widely and sail aimlessly can be very painfull.

I'm sure you also thinks the same, and this is a package you might need.

## Install

Install the package using NPM:

```
npm install rxjs-debugger --save-dev
```

And add only the following code to `main.ts`,

```js
import { Observable } from "rxjs";
import { RxJSDebugger } from "rxjs-debugger";
RxJSDebugger.init(Observable);
```

Or `require` the module for use with Node or a CommonJS bundler:

```js
const { RxJSDebugger } = require("rxjs-debugger");
const { Observable } = require("rxjs");
RxJSDebugger.init(Observable);
```

## Core concepts

`rxjs-debugger` adds logic to `.subscribe()` method of Observable's prototype that allow us to monitorize the subscription and unsubscription calls of RxJS Observables and its extended classes (EventEmitter, Subject, BehaviorSubject...).

### Module API

The exported `RxJSDebugger` object exposes the following API:

```js
export const RxJSDebugger: {
  subscriptionsMap: () => {},
  openedSubscriptionsCount: () => number,
  clearSubscriptionsMap: () => void,
  init: (observableDef) => void
}
```

Unlike other RxJS debugging libraries, this one doesn't obly to change every observable we want to monitorize. Call `.init()` method is enough to trigger the debugging mode. After that, when an observable is subscribed, a new uuid is pushed to subscriber's class entry in `subscriptionsMap`. This allows us to know in realtime how many subscriptions exist in each project's class.

### Window API

More than that, developer can access the tracked data via browser's console, using,

```
window.subscriptionsMap
```
