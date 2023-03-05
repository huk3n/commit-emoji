import { Rules } from './execute.mjs';

export function headerFormat(): Rules {
  return async (context, message) => {
    const result = message.trim().match(/(?<type>:.+?:)\s(?<subject>.+)/);
    if (!result || !result.groups || !result.groups['type'] || !result.groups['subject']) {
      return Promise.reject('header 格式错误正确格式：(<emoji> <subject>)')
    }
    context.emoji = result.groups['type']
    context.subject = result.groups['subject']
  }
}
