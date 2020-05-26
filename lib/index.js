const protoObservable = require('rxjs').Observable.prototype;
const { uuid } = require('uuidv4');

window.numOfSubscriptionsMap = {};

window.countSubsOnMap = () => {
  return Object.keys(window.numOfSubscriptionsMap).reduce(
    (acc, curr) => acc + window.numOfSubscriptionsMap[curr].length
  , 0);
}

window.clearSubscriptionsMap = () => window.numOfSubscriptionsMap = {};

/**
 * Test if subscribe method was called in a targetted class
 *
 * @param {*} stacktrace
 */
const regexFiles = () => new RegExp(/(?<![\(|\/])\b[a-zA-Z]*(Component|Service|Pipe|Directive)[.| ](?![\w\s]*[\)])/gm);
const isTargetToOwnClass = (stacktrace) => regexFiles().test(stacktrace);

/**
 * Test if target observable is not part of a node_module package
 * NOTE: since we are overriding Observable object,
 * it will also affect observables from node_modules directory
 *
 * @param {*} stacktrace
 */
const regexNodeModulesFiles = () => new RegExp('^((?!node_modules).)*$', 'gm');
const isNotTargetToNodeModulePackage = (stacktrace) => regexNodeModulesFiles().test(stacktrace);

/**
 * Test if we are handling the first call of subscribe method
 * NOTE: when an observable is subscribed, this method is called recursivelly
 * per each applied pipe operator.
 *
 * @param {*} stacktrace
 */
const isFirstCall = (stacktrace) => (stacktrace.match(/.overrideSubscribe/g) || []).length === 1;

/**
 * Get class name from a fake error stacktrace
 *
 * @param {*} stacktrace
 * @returns
 */
const getClassName = (stacktrace) => {
  const caller = stacktrace
    .split('\n')
    .find(line => isTargetToOwnClass(line) && isNotTargetToNodeModulePackage(line));

  if (!caller) {
    return null;
  }

  const callerTokens = caller
    .trim()
    .split(' ');

  return callerTokens.length === 4 ? callerTokens[2] : callerTokens[1].split('.')[0];
};

/**
 * Add new subscription to subscription map
 * NOTE: each entry has same format
 * <className> : uuid[]
 *
 * @param {*} className
 */
const registerNewSubscription = (className) => {
  if (!window.numOfSubscriptionsMap[className]) {
    window.numOfSubscriptionsMap[className] = [];
  }

  const id = uuid();
  window.numOfSubscriptionsMap[className].push(id);

  return id;
};

/**
 * Remove subscription from subscription map
 *
 * @param {*} id
 * @param {*} className
 */
const unregisterSubscription = (id, className) => {
  if (window.numOfSubscriptionsMap[className]) {
    window.numOfSubscriptionsMap[className].splice(window.numOfSubscriptionsMap[className].findIndex(it => it === id), 1);
  }

  if (window.numOfSubscriptionsMap[className] && !window.numOfSubscriptionsMap[className].length) {
    delete window.numOfSubscriptionsMap[className];
  }
}

const originalSubscribeFn = protoObservable.subscribe;
exports.enableSubscriptionMonitor = (

) => {
  protoObservable.subscribe = function overrideSubscribe(...args) {
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
};
