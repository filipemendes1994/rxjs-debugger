const { isTargetToOwnClass, isFirstCall } = require('./regex-utils');
const { getClassName } = require('./get-classname');
const { registerNewSubscription, unregisterSubscription } = require('./handle-subscriptions');

const RxJSDebugger = {
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

  /**
   * Override original behavior from Observable.subscribe()
   * Adds some logic to keep track the subscription and unsubscription of RxJS objects
  */
  init: (observableDef) => {
    window.subscriptionsMap = {};
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

      const id = registerNewSubscription(className);
      return originalSubscribeFn.call(this, ...args).add(() => unregisterSubscription(id, className));
    };
  },
}

exports.RxJSDebugger = RxJSDebugger;
