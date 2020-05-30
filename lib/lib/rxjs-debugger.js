const { isTargetToOwnClass, isFirstCall } = require('./regex-utils');
const { getClassName } = require('./get-classname');
const {
  registerNewSubscription,
  unregisterSubscription,
  valueChanges,
  obSubscribed$,
  obUnsubscribed$
} = require('./handle-subscriptions');

let onSubscribeFns = [], onUnsubscribeFns = [];

const RxJSDebugger = {
  valueChanges: valueChanges,
  obSubscribed$: obSubscribed$,
  obUnsubscribed$: obUnsubscribed$,

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
  addOnSubscribeLogic: (fn) => onSubscribeFns.push(fn),
  /** Add unsubscribe logic */
  addOnUnsubscribeLogic: (fn) => onUnsubscribeFns.push(fn),

  /** Clear all subscribe extra logic */
  clearOnSubscribeLogic: () => onSubscribeFns = [],
  /** Clear all unsubscribe extra logic */
  clearOnUnsubscribeLogic: () => onUnsubscribeFns = [],

  /**
   * Override original behavior from Observable.subscribe()
   * Adds some logic to keep track the subscription and unsubscription of RxJS objects
  */
  init: (observableDef, onSubscribeFn, onUnsubscribeFn) => {
    window.subscriptionsMap = {};

    if (onSubscribeFn) {
      RxJSDebugger.addOnSubscribeLogic(onSubscribeFn);
    }

    if (onUnsubscribeFn) {
      RxJSDebugger.addOnUnsubscribeLogic(onUnsubscribeFn);
    }

    const originalSubscribeFn = observableDef.prototype.subscribe;
    observableDef.prototype.subscribe = function overrideSubscribe(...args) {
      const stacktrace = new Error().stack;
      const handleSubscription = isTargetToOwnClass(stacktrace) && isFirstCall(stacktrace);

      if (!handleSubscription) {
        return originalSubscribeFn.call(this, ...args);
      }

      const className = getClassName(stacktrace);
      if (!className) {
        return originalSubscribeFn.call(this, ...args);
      }

      onSubscribeFns.forEach(fn => fn());
      const id = registerNewSubscription(className);
      return originalSubscribeFn.call(this, ...args).add(() => {
        onUnsubscribeFns.forEach(fn => fn());
        unregisterSubscription(id, className)
      });
    };
  },
}

exports.RxJSDebugger = RxJSDebugger;
