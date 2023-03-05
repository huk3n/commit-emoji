import { Rules } from './execute.mjs';

export function headerSubjectFormat(): Rules {
  return async (ctx, message) => {
    if (ctx.subject && /[a-z]/i.test(ctx.subject[0])) {
      if (/[a-z]/.test(ctx.subject[0])) {
        return Promise.reject("需要以大写开头")
      }
      if (/\.|。$/.test(ctx.subject)) {
        return Promise.reject("不要以句号结尾")
      }
    }
  }
}
