import * as crypto from 'crypto';

/**
 * @description 비밀번호를 해시값으로 변환하는 함수
 * @param {string} password
 * @returns {string} password(hash값)
 */
export const hash = (password: string): string => {
  return crypto
    .createHmac('sha256', 'lacord$key$vlaue')
    .update(password)
    .digest('hex');
};

/**
 * @description 중복된 데이터 없에는 함수
 * @param {string[]} array
 * @returns {string[]} array
 */
export const filterUnique = (array: string[]): string[] => {
  return [...new Set(array)];
};

/**
 * @description 문자가 공백인지 아닌지 체크
 * @param {string} text
 * @returns {boolean}
 */
export const checkEmpty = (text: string) => {
  if (!text) return true;
  const replaced = text
    .trim()
    .replace(
      /([\u3164\u115F\u1160\uFFA0\u200B\u0001-\u0008\u000B-\u000C\u000E-\u001F]+)/g,
      ''
    );
  if (replaced === '') return true;
  return false;
};
