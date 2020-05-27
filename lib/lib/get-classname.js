const { isTargetToOwnClass, isNotTargetToNodeModulePackage} = require('./regex-utils');

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

exports.getClassName = getClassName;
