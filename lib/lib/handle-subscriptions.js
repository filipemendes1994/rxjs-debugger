const { v4: uuid } = require('uuid');
const { Subject } = require('rxjs');

const valueChanges = new Subject();
const obSubscribed$ = new Subject();
const obUnsubscribed$ = new Subject();


/**
 * Add new subscription to subscription map
 * NOTE: each entry has same format
 * <className> : uuid[]
 *
 * @param {*} className
 */
const registerNewSubscription = (className) => {
  if (!window.subscriptionsMap[className]) {
    window.subscriptionsMap[className] = [];
  }

  const id = uuid();
  window.subscriptionsMap[className].push(id);

  valueChanges.next(window.subscriptionsMap);
  obSubscribed$.next(className);

  return id;
};

/**
 * Remove subscription from subscription map
 *
 * @param {*} id
 * @param {*} className
 */
const unregisterSubscription = (id, className) => {
  if (window.subscriptionsMap[className]) {
    window.subscriptionsMap[className].splice(window.subscriptionsMap[className].findIndex(it => it === id), 1);
  }

  if (window.subscriptionsMap[className] && !window.subscriptionsMap[className].length) {
    delete window.subscriptionsMap[className];
  }

  valueChanges.next(window.subscriptionsMap);
  obUnsubscribed$.next(className);
}

exports.valueChanges = valueChanges;
exports.obSubscribed$ = obSubscribed$;
exports.obUnsubscribed$ = obUnsubscribed$;

exports.registerNewSubscription = registerNewSubscription;
exports.unregisterSubscription = unregisterSubscription;
