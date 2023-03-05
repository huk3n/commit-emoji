import { emoji } from '../constant/emoji.mjs';
import { Rules } from './execute.mjs';

export function headerEmoji():Rules {
  return async (ctx, message: string) => {
    const result = message.trim().match(/(?<type>:.+?:)\s(?<subject>.+)/);
    const emoji_code = result?.groups?.['type'];
    if (!emoji_code) {
      return Promise.reject('需要以一个emoji开头');
    }
    if (!emoji.map(val => val.code).some(val => val === emoji_code)) {
      return Promise.reject('无法识别的emoji');
    }
  };
}
