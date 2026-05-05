/**
 * Generates a unique ID
 *
 * @return {string}
 */
export default function getUniqueID() {
  let randomPart;

  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    randomPart = array[0].toString(16);
  } else {
    randomPart = Math.floor(Math.random() * 0x100000000).toString(16);
  }

  return `rnmr_${Date.now().toString(16)}${randomPart}`;
}
