/**
 * make first letter uppercase
 * @returns string
 */
export const ucFirst = word =>
  word[0].toUpperCase() + word.toLowerCase().slice(1)

/**
 * Convert underscore to camelcase
 * @param text 
 * @returns string
 */
export const camelize = text => {
  let words = text.split(/[-_]/g);
  return words[0].toLowerCase() + words.slice(1).map(ucFirst);
}