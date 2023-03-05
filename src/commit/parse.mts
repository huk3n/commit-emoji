// 安装此格式进行解析
// <type>(<scope>): <subject>
// <>
// <body>
// <>
// <footer>

// TODO
export function parse(message: string) {
  if (!message || !message.trim()) return null
  let header = ''
  let other = ''
  for (let i = 0, len = message.length; i < len; i++) {
    if (message[i] === '\n') {
      other = message.slice(i+1)
      break
    }
    header += message[i]
  }
  const [body, footer] = other.split('\n\n')
  return {
    header: header.trim().replace(/^\n|\n$/g, ''),
    body: body ? body.trim().replace(/^\n|\n$/g, '') : null,
    footer: footer? footer.trim().replace(/^\n|\n$/g, '') : null
  }
}
