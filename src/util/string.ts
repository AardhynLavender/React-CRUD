/**
 * Capitalizes the first character in a string
 * @param string to create sentence case from
 * @returns sentence case version of string
 */
export const ToSentenceCase = (string: string): string =>
  typeof string === 'string'
    ? string[0].toUpperCase() + string.substring(1).toLowerCase()
    : string
