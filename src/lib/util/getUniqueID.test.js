import test from 'node:test';
import assert from 'node:assert';
import getUniqueID from './getUniqueID.js';

test('getUniqueID returns a string starting with rnmr_', () => {
  const id = getUniqueID();
  assert.strictEqual(typeof id, 'string');
  assert.ok(id.startsWith('rnmr_'));
});

test('getUniqueID returns unique IDs', () => {
  const ids = new Set();
  for (let i = 0; i < 1000; i++) {
    const id = getUniqueID();
    assert.ok(!ids.has(id), `Duplicate ID found: ${id}`);
    ids.add(id);
  }
});
