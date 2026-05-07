/**
 * Generates a unique ID
 *
 * @return {string}
 */
// Module-level counter ensures in-process uniqueness. JavaScript is
// single-threaded, so this increment is safe without atomic operations.
let _counter = 0;

export default function getUniqueID() {
  // Reset before precision loss; 2^53 calls is effectively unreachable in practice.
  if (_counter >= Number.MAX_SAFE_INTEGER) {
    _counter = 0;
  }
  const count = (++_counter).toString(16);
  let randomPart;

  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    // 128 bits of cryptographically strong randomness (4 × 32-bit values)
    const array = new Uint32Array(4);
    crypto.getRandomValues(array);
    randomPart = Array.from(array, (v) => v.toString(16).padStart(8, '0')).join(
      '',
    );
  } else {
    // Fallback for environments without the Crypto API (e.g. older React Native).
    // Note: Math.random() does not provide cryptographic randomness.
    randomPart = Array.from({length: 4}, () =>
      Math.floor(Math.random() * 0x100000000)
        .toString(16)
        .padStart(8, '0'),
    ).join('');
  }

  return `rnmr_${Date.now().toString(16)}_${count}_${randomPart}`;
}
