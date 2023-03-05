import { emoji } from '../constant/emoji.mjs';

export function validateSubject(msg: string) {
  const allowEmojiList = emoji.map(val => val.code);
  // 检查是否以 emoji 的 code 开头
  const subject = allowEmojiList.find(val => msg.startsWith(val));
  if (!subject) {
    console.log('An emoji when the submission type is required.');
    process.exit(1);
  }
  // emoji 认为是一个字符
  if (msg.trim().length > 49 + subject.length) {
    console.log('The maximum number of submitted topics is 50 characters.');
    process.exit(1);
  }
  if (['.', '。'].includes(msg[msg.length - 1])) {
    console.log('Don\'t add a full stop at the end of the sentence.');
    process.exit(1);
  }
}

export function validateBody(lines: string[]) {
  if (lines.some(val => val.length > 72)) {
    console.log('Each line of the submitted body is limited to 72 characters.');
    process.exit(1);
  }
}

// 这里简单校验下。
export function runMessageValidate(message: string) {
  if (!message) return;
  const lines = message.split('\n');
  validateSubject(lines[0]);
  if (lines.length <= 1) return;
  if (lines[1].length > 0) {
    console.log('A blank line is required for the subject and text.');
    process.exit(1);
  }
  if (lines.length <= 2) return;
  const body = [];
  for (const line of lines.slice(2)) {
    if (line.length === 0) {
      break;
    }
    // Git 1.82 版本后可自定义注释字符，这里暂时只考虑 #
    if (line.startsWith('#')) {
      break;
    }
    body.push(line);
  }
  if (body.length) {
    validateBody(lines.slice(2));
  }
}
