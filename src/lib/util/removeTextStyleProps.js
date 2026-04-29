import textStyleProps from '../data/textStyleProps';

export default function removeTextStyleProps(style) {
  const intersection = textStyleProps.filter((value) =>
    Object.prototype.hasOwnProperty.call(style, value)
  );

  const obj = {...style};

  intersection.forEach((value) => {
    delete obj[value];
  });

  return obj;
}
