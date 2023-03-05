import { run } from './shell.mjs';
import {resolve, normalize} from 'path';

/**
 * 当前路径是否是一个git仓库
 * @return {Promise<boolean>}
 */
export async function isGitRepository(cwd = process.cwd()) {
  try {
    const result = await run(cwd, 'git rev-parse --is-inside-work-tree');
    return result.startsWith('true');
  } catch (err) {
    if ((err as string).includes('not a git repository')) {
      return false;
    }
    return false;
  }
}

/**
 * 获取 git 当前变更的文件列表
 * @param {string} cwd
 * @return {Promise<string[]>}
 */
export async function getStagedFiles(cwd = process.cwd()): Promise<string[]> {
  const result = await run(cwd, 'git -c submodule.recurse=false diff --staged --name-only -z --diff-filter=ACMR');
  return result
    // eslint-disable-next-line no-control-regex
    .replace(/\u0000$/, '')
    .split('\u0000')
    .map(item => normalize(resolve(cwd, item)));
}
