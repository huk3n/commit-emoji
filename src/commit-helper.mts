#!/usr/bin/env node
import chalk from 'chalk';
import fuzzy from 'fuzzy';
import inquirer from 'inquirer';
import {emoji} from './constant/emoji.mjs';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import maxLengthInputPrompt from 'inquirer-maxlength-input-prompt';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import searchList from 'inquirer-search-list';
import {run} from './helper/shell.mjs';

inquirer.registerPrompt('autocomplete', inquirerPrompt);
inquirer.registerPrompt('maxlength-input', maxLengthInputPrompt);
inquirer.registerPrompt('search-list', searchList);

function fuzzySearchSubjectType(keyword: string) {
  const values = fuzzy.filter(keyword, emoji, {
    extract: el => el.description + el.description_zh,
  });
  return values.map(val => ({
    name: `${val.original.emoji}   : ${val.original.description}(${val.original.description_zh})`,
    short: val.original.emoji,
    value: val.original.code,
  }));
}

interface CommitMessage {
  type: string;
  subject: string;
  body?: string;
  footer?: string;
}

function doCommit(message: CommitMessage) {
  let msg = `${message.type} ${message.subject}\n`;
  if (message.body) {
    msg += '\n' + message.body + '\n';
  }
  if (message.footer) {
    msg += '\n' + message.footer + '\n';
  }

  return run(process.cwd(), `git commit -m '${msg}'`);
}

async function start() {
  const gray = chalk.rgb(153,153,153)
  const result = await inquirer.prompt<CommitMessage>([
    {
      name: 'type',
      pageSize: 6,
      loop: false,
      type: 'search-list',
      // type: 'autocomplete',
      message: 'Commit Type',
      suffix: gray('(用于标识此提交中引入的更改类型-目前只允许列表中的表情符号)'),
      // source: (_, input ='') => fuzzySearchSubjectType(input),
      choices: fuzzySearchSubjectType(''),
      validate(val) {
        if (!val) return '请选择 subject type';
        return true;
      },
    },
    {
      name: 'subject',
      type: 'maxlength-input',
      message: 'Commit Subject',
      maxLength: 49,
      suffix: gray('(需要小于49个字符，不要以句号结尾，首字母需要大写)'),
      when: answers => {
        return !!answers.type;
      },
      validate(val) {
        if (!val) return '请输入';
        return true;
      },
    },
    {
      // TODO 多行输入
      name: 'body',
      type: 'input',
      message: 'Commit Body',
      suffix: gray('(将正文的每一行换行为 72 个字符，可以使用 Markdown 语法)'),
    },
    {
      // TODO 多行输入
      name: 'footer',
      type: 'input',
      message: 'Commit Footer',
      suffix: gray('(引用此提交与该问题的状态相关的问题;)'),
      when: answers => {
        return !!answers.body;
      },
    },
  ]);
  await doCommit(result);
}

start().catch(err => {
  console.log(err);
  process.exit(1);
});
