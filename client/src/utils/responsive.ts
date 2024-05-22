import { UAParser } from 'ua-parser-js';

export const isMobileDevice = () => {
  if (typeof navigator !== 'undefined') {
    const parser = new UAParser();
    const result = parser.getResult();
    return result.device.type === 'mobile';
  }
  return false;
};
