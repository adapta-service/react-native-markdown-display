import {Linking} from 'react-native';

const SAFE_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:', 'sms:'];

const isSafeUrl = (url) => {
  const match = url.match(/^([a-z0-9+.-]+):/i);
  if (!match) {
    return true; // No protocol, assume it's a relative/safe path
  }
  const protocol = match[0].toLowerCase();
  return SAFE_PROTOCOLS.indexOf(protocol) !== -1;
};

export default function openUrl(url, customCallback) {
  if (customCallback) {
    const result = customCallback(url);
    if (url && result && typeof result === 'boolean' && isSafeUrl(url)) {
      Linking.openURL(url);
    }
  } else if (url && isSafeUrl(url)) {
    Linking.openURL(url);
  }
}
