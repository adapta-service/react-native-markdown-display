import test from 'node:test';
import assert from 'node:assert';
import openUrl from '../openUrl.js';
import {Linking} from 'react-native';

test('openUrl - opens safe urls', () => {
  let calledWith = null;
  Linking.openURL = (url) => {
    calledWith = url;
  };
  openUrl('http://google.com');
  assert.strictEqual(calledWith, 'http://google.com');
});

test('openUrl - opens relative urls', () => {
  let calledWith = null;
  Linking.openURL = (url) => {
    calledWith = url;
  };
  openUrl('/relative/path');
  assert.strictEqual(calledWith, '/relative/path');
});

test('openUrl - blocks unsafe urls', () => {
  let called = false;
  Linking.openURL = () => {
    called = true;
  };
  openUrl('javascript:alert(1)');
  assert.strictEqual(called, false);
});

test('openUrl - blocks custom schemes', () => {
  let called = false;
  Linking.openURL = () => {
    called = true;
  };
  openUrl('intent://something');
  assert.strictEqual(called, false);
});

test('openUrl - custom callback safe url', () => {
  let calledWith = null;
  Linking.openURL = (url) => {
    calledWith = url;
  };
  openUrl('http://google.com', () => true);
  assert.strictEqual(calledWith, 'http://google.com');
});

test('openUrl - custom callback blocks unsafe url even if true', () => {
  let called = false;
  Linking.openURL = () => {
    called = true;
  };
  openUrl('javascript:alert(1)', () => true);
  assert.strictEqual(called, false);
});

test('openUrl - custom callback safe url but returns false', () => {
  let called = false;
  Linking.openURL = () => {
    called = true;
  };
  openUrl('http://google.com', () => false);
  assert.strictEqual(called, false);
});
