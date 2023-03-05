import { Rules } from './execute.mjs';

export function headerMaxLength(mexLength: number): Rules {
  return async (ctx, message: string) => {
    const result = message.trim().match(/(?<type>:.+?:)\s(?<subject>.+)/);
    const subject = result?.groups?.['subject'];
    const header = subject ? subject : message;
    if (header.length > mexLength) {
      return Promise.reject(`最多${mexLength}个字符`);
    }
  };
}
