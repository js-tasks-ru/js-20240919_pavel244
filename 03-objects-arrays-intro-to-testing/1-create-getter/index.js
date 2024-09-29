/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const keys = path.split('.');
  let n = keys.length;
  return (obj) => {
    for (let i = 0; i < n; i++) {
      if (!obj.hasOwnProperty(keys[i])) {
        return undefined;
      }
      obj = obj[keys[i]];
    }
    return obj;
  };
}
