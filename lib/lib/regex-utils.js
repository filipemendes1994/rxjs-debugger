/**
 * Test if subscribe method was called in a targetted class
 *
 * @param {*} stacktrace
 */
const defaultTargettedClasses = '(Component|Service|Pipe|Directive)';
const parseTargettedClasses =
  (targettedClasses) =>
    targettedClasses && targettedClasses.reduce(
      (acc, curr, idx) =>
        idx < targettedClasses.length - 1 ?
          acc += curr + '|' :
          acc += curr + ')', '('
      );

const regexFiles = (targettedClasses) => new RegExp(`\\s[a-zA-Z]*${
  targettedClasses ?
    parseTargettedClasses(targettedClasses) :
    defaultTargettedClasses
  }[.| ]`,'gm');

const isTargetToOwnClass = (stacktrace, targettedClasses) => regexFiles(targettedClasses).test(stacktrace);

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

