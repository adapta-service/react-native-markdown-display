import {textStylePropsSet} from '../data/textStyleProps';

export default function removeTextStyleProps(style) {
  const obj = {};
  for (const key in style) {
    if (
      Object.prototype.hasOwnProperty.call(style, key) &&
      !textStylePropsSet.has(key)
    ) {
      obj[key] = style[key];
    }
  }
  return obj;
}
