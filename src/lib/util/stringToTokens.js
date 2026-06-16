import logger from './logger.js';
export function stringToTokens(source, markdownIt) {
  let result = [];
  try {
    result = markdownIt.parse(source, {});
  } catch (err) {
    logger.warn(err);
  }

  return result;
}
