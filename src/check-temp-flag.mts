#!/usr/bin/env node
import chalk from 'chalk';
import {readFile} from 'fs/promises';
import { getStagedFiles } from './helper/git.mjs';

const pattern = /\/\/\s!TEMP/i;

function print(cwd: string, files: string[]) {
  if (files.length === 0) return;
  console.log('存在临时代码标记未清除！');
  for (const url of files) {
    console.log(`    in ${chalk.red(url.replace(cwd, '.'))}`);
  }
  process.exit(1);
}

async function checkGitStaged() {
  // 如果运行此方法的目录不是一个 git 仓库或者没有找到 git 命令就直接返回
  const cwd = process.cwd();
  const files = await getStagedFiles(cwd).catch(() => null);
  if (!files || files.length === 0) return;
  const flags = [];
  for (const path of files) {
    const str = await readFile(path, 'utf-8');
    if (pattern.test(str)) {
      flags.push(path);
    }
  }
  return print(cwd, flags);
}

checkGitStaged().catch(err => {
  console.log(err)
  process.exit(1)
})
