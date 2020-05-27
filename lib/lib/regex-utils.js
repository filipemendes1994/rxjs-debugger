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

exports.isTargetToOwnClass = isTargetToOwnClass;
exports.isNotTargetToNodeModulePackage = isNotTargetToNodeModulePackage;
exports.isFirstCall = isFirstCall;

