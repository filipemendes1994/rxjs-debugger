const { uuid } = require('uuidv4');

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
}

exports.registerNewSubscription = registerNewSubscription;
exports.unregisterSubscription = unregisterSubscription;
