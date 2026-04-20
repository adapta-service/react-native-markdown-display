import textStyleProps from '../data/textStyleProps';

export default function removeTextStyleProps(style) {
  const intersection = textStyleProps.filter((value) => value in style);

  const obj = {...style};

  intersection.forEach((value) => {
    delete obj[value];
  });

  return obj;
}
