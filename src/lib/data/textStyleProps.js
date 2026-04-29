const textStyleProps = [
  'textShadowOffset',
  'color',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'lineHeight',
  'textAlign',
  'textDecorationLine',
  'textShadowColor',
  'fontFamily',
  'textShadowRadius',
  'includeFontPadding',
  'textAlignVertical',
  'fontVariant',
  'letterSpacing',
  'textDecorationColor',
  'textDecorationStyle',
  'textTransform',
  'writingDirection',
];

export const textStylePropsSet = new Set(textStyleProps);
<<<<<<< perf-optimize-text-style-lookups-11542932240715756341

const syncTextStylePropsSet = () => {
  textStylePropsSet.clear();

  for (const prop of textStyleProps) {
    textStylePropsSet.add(prop);
  }
};

const mutatingMethods = [
  'copyWithin',
  'fill',
  'pop',
  'push',
  'reverse',
  'shift',
  'sort',
  'splice',
  'unshift',
];

for (const methodName of mutatingMethods) {
  const originalMethod = textStyleProps[methodName];

  Object.defineProperty(textStyleProps, methodName, {
    configurable: true,
    enumerable: false,
    writable: true,
    value(...args) {
      const result = originalMethod.apply(this, args);
      syncTextStylePropsSet();
      return result;
    },
  });
}
=======
>>>>>>> master
export default textStyleProps;
