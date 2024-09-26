/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const locales = ["ru", "en"];
  const options = {sensitivity: "variant", caseFirst: "upper"};
  const collator = new Intl.Collator(locales, options);

  const sortAsc = (a, b) => {
    if (typeof a === 'string') {
      return collator.compare(a, b);
    } else {
      return a > b ? 1 : -1;
    }
  };

  const sortDesc = (a, b) => {
    if (typeof a === 'string') {
      return collator.compare(b, a);
    } else {
      return a < b ? 1 : -1;
    }
  };

  return [...arr].sort(param === 'asc' ? sortAsc : sortDesc);
}
