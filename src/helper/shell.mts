import shell from 'shelljs';

/**
 * 运行一个 shell 命令
 * @param {string} cwd
 * @param {string} command
 * @return {Promise<string>}
 */
export function run(cwd: string, command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      shell.pushd('-q', cwd);
      shell.exec(command, {silent: true}, function (code, stdout, stderr) {
        if (code !== 0) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
      shell.popd('-q', '-1');
    } catch (e) {
      reject(e);
    }
  });
}
