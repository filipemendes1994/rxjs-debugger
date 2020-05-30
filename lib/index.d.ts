import { Subject } from "rxjs";

export declare const RxJSDebugger: {
  /**
   * Emits subscriptionsMap every time a new entry is created on map
   *
   * @type {Subject<any>}
   */
  valueChanges: Subject<any>;

  /**
   * Emits className every time an observable is subscribed
   *
   * @type {Subject<string>}
   */
  obSubscribed$: Subject<string>,

  /**
   * Emits className every time an observable is unsubscribed
   *
   * @type {Subject<string>}
   */
  obUnsubscribed$: Subject<string>,

  subscriptionsMap: () => {},
  openedSubscriptionsCount: () => number,
  clearSubscriptionsMap: () => void,
  init: (observableDef) => void
}
