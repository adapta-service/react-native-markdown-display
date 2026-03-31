import cssToReactNative from 'css-to-react-native';

export default function convertAdditionalStyles(style) {
  const rules = style.split(';');

  const tuples = rules
    .map((rule) => {
      const [key, value] = rule.split(':');

      if (key && value) {
        return [key.trim(), value.trim()];
      } else {
        return null;
      }
    })
    .filter((x) => {
      return x != null;
    });

  const conv = cssToReactNative(tuples);

  return conv;
}
