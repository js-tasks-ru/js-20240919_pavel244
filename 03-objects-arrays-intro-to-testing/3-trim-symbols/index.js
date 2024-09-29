/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string.length < 1 || size === 0) return '';
  if (typeof size === 'undefined') return string;
  let counter = 0;
  return string.split('').reduce((prev, current) => {
    prev.slice(-1) === current
      ? counter += 1
      : counter = 0;
    return counter < size
      ? prev + current
      : prev;
  });
}
