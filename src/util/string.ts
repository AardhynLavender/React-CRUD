export const ToSentenceCase = (string: string): string =>
  string[0].toUpperCase() + string.substring(1).toLowerCase()
