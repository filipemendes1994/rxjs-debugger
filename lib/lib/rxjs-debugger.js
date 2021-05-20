const { isTargetToOwnClass, isFirstCall } = require('./regex-utils');
const { getClassName } = require('./get-classname');
const {
  registerNewSubscription,
  unregisterSubscription,
  valueChanges,
  obSubscribed$,
  obUnsubscribed$
} = require('./handle-subscriptions');

const RxJSDebugger = {
  valueChanges: valueChanges,
  obSubscribed$: obSubscribed$,
  obUnsubscribed$: obUnsubscribed$,

  onSubscribeFns: [],
  onUnsubscribeFns: [],
  /**
   * Get subscriptions map
   * Format: <className>: uuid[]
   */
  subscriptionsMap: () => window.subscriptionsMap,

  /** Retrieve count of opened subscriptions */
  openedSubscriptionsCount: () =>
    Object.keys(window.subscriptionsMap).reduce(
      (acc, curr) => acc + window.subscriptionsMap[curr].length
    , 0),

  /** Reset subscritions map */
  resetSubscriptionsMap: () => window.subscriptionsMap = {},

  /** Add subscribe logic */
  addOnSubscribeLogic: (fn) => !!fn && RxJSDebugger.onSubscribeFns.push(fn),
  /** Add unsubscribe logic */
  addOnUnsubscribeLogic: (fn) => !!fn && RxJSDebugger.onUnsubscribeFns.push(fn),

  /** Clear all subscribe extra logic */
  clearOnSubscribeLogic: () => RxJSDebugger.onSubscribeFns = [],
  /** Clear all unsubscribe extra logic */
  clearOnUnsubscribeLogic: () => RxJSDebugger.onUnsubscribeFns = [],

  /** Set files to target while monitorizing observables */
  setTargettedClasses: (targettedClasses) =>
    RxJSDebugger.targettedClasses = targettedClasses,

  /**
   * Override original behavior from Observable.subscribe()
   * Adds some logic to keep track the subscription and unsubscription of RxJS objects
  */
  init: (observableDef, targettedClasses, onSubscribeFn, onUnsubscribeFn) => {
    window.subscriptionsMap = {};

    RxJSDebugger.addOnSubscribeLogic(onSubscribeFn);
    RxJSDebugger.addOnUnsubscribeLogic(onUnsubscribeFn);

    const originalSubscribeFn = observableDef.prototype.subscribe;
    observableDef.prototype.subscribe = function overrideSubscribe(...args) {
      const stacktrace = new Error().stack;
      const handleSubscription = isTargetToOwnClass(stacktrace, targettedClasses) && isFirstCall(stacktrace);

      if (!handleSubscription) {
        return originalSubscribeFn.call(this, ...args);
      }

      const className = getClassName(stacktrace, targettedClasses);
      if (!className) {
        return originalSubscribeFn.call(this, ...args);
      }

      RxJSDebugger.onSubscribeFns.forEach(fn => fn());
      const id = registerNewSubscription(className);
      const subscription = originalSubscribeFn.call(this, ...args);
      subscription.add(() => {
        RxJSDebugger.onUnsubscribeFns.forEach(fn => fn());
        unregisterSubscription(id, className)
      });
      return subscription;
    };
  },
}

exports.RxJSDebugger = RxJSDebugger;
