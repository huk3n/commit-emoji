import { parse } from './parse.mjs';
import { headerFormat } from '../rules/header-format.mjs';
import { headerSubjectFormat } from '../rules/header-subject-format.mjs';
import { execute_rules } from '../rules/execute.mjs';
import { headerEmoji } from '../rules/header-emoji.mjs';
import { headerMaxLength } from '../rules/header-max-length.mjs';

export function validateHeader(msg: string) {
  return execute_rules(msg, [
    headerFormat(),
    headerEmoji(),
    headerMaxLength(50),
    headerSubjectFormat(),
  ])
}
// 这里简单校验下。
export async function runMessageValidate(message: string) {
  const commitMessage = parse(message)
  if (!commitMessage) return;
  await validateHeader(commitMessage.header);
}
