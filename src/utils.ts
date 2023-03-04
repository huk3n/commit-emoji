import shell from 'shelljs'
export function getGitChangedFiles() {
  shell.exec(`git diff HEAD^ --name-only`)

}
