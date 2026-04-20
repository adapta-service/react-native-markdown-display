import textStyleProps from './src/lib/data/textStyleProps.js';

const textStylePropsSet = new Set(textStyleProps);

const testKeys = ['color', 'fontSize', 'padding', 'margin', 'fontFamily', 'fontWeight', 'borderRadius', 'textShadowOffset'];

function benchArray() {
  const start = performance.now();
  let count = 0;
  for (let i = 0; i < 1000000; i++) {
    for (let j = 0; j < testKeys.length; j++) {
      if (textStyleProps.includes(testKeys[j])) {
        count++;
      }
    }
  }
  const end = performance.now();
  return { time: end - start, count };
}

function benchSet() {
  const start = performance.now();
  let count = 0;
  for (let i = 0; i < 1000000; i++) {
    for (let j = 0; j < testKeys.length; j++) {
      if (textStylePropsSet.has(testKeys[j])) {
        count++;
      }
    }
  }
  const end = performance.now();
  return { time: end - start, count };
}

console.log("Array includes:", benchArray());
console.log("Set has:", benchSet());
