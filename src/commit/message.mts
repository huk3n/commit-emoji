interface MessageData {
  type: string
  scope?: string
  subject: string
  body?: string;
  footer?: string;
}

export function buildCommitMessage(data: MessageData) {
  const {type, scope, subject, footer, body} = data
  let message = type
  message = scope ? `${message}(${scope}): ${subject}` : `${message} ${subject}`
  message = body ?  `${message}\n\n${body}` : message;
  message = footer ? `${message}\n\n${footer}` : message;
  return message
}
