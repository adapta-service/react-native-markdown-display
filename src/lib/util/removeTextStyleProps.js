import {textStylePropsSet} from '../data/textStyleProps';

export default function removeTextStyleProps(style) {
  const obj = {};

  Object.keys(style).forEach((key) => {
    if (!textStylePropsSet.has(key)) {
      obj[key] = style[key];
    }
  });

  return obj;
}
