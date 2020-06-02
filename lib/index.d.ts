import { Subject, Observable } from "rxjs";

export declare type SubscriptionsMap = { [key: string]: string[] };
export declare type ClassName = string;
export declare type ObservableDef = typeof Observable;

export declare const RxJSDebugger: {
  /**
   * Emits subscriptionsMap every time an observable is subscribed or unsubscribed
   *
   * @type {Subject<SubscriptionsMap>}
   */
  valueChanges: Subject<SubscriptionsMap>;

  /**
   * Emits className every time an observable is subscribed
   *
   * @type {Subject<ClassName>}
   */
  obSubscribed$: Subject<ClassName>,

  /**
   * Emits className every time an observable is unsubscribed
   *
   * @type {Subject<ClassName>}
   */
  obUnsubscribed$: Subject<ClassName>,

  /** Add subscribe logic */
  addOnSubscribeLogic: (fn: Function) => void,
  /** Add unsubscribe logic */
  addOnUnsubscribeLogic: (fn: Function) => void,

  /** Clear all subscribe extra logic */
  clearOnSubscribeLogic: () => void,
  /** Clear all unsubscribe extra logic */
  clearOnUnsubscribeLogic: () => void,

  /** Set files to target while monitorizing observables */
  setTargettedClasses: (targettedClasses: ClassName[]) => void,

  /** Get Subscription Map */
  subscriptionsMap: () => SubscriptionsMap,
  /** Get opened subscriptions count */
  openedSubscriptionsCount: () => number,
  /** Reset subscriptions map */
  clearSubscriptionsMap: () => void,

  /**
   * Enables subscriptions monitorization
   * ex: RxJSDebugger.init(Observable, ['AppComponent'], () => console.log('observable subscribed'), () => console.log('observable unsubscribed'))
   */
  init: (
    observableDef: ObservableDef,
    targettedClasses?: ClassName[],
    onSubscribeFn?: () => void,
    onUnsubscribeFn?: () => void
  ) => void
}
