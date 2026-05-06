import cssToReactNative from 'css-to-react-native';

export default function convertAdditionalStyles(style) {
  const rules = style.split(';');

  const tuples = rules.reduce((acc, rule) => {
    const [key, value] = rule.split(':');

    if (key && value) {
      acc.push([key.trim(), value.trim()]);
    }

    return acc;
  }, []);

  const conv = cssToReactNative(tuples);

  return conv;
}
