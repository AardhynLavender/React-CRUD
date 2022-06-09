/**
 * @name          String
 * @version       1.0.0
 *
 * @fileoverview  String related utility functions
 */

/**
 * Capitalizes the first character in a string
 * @param string to create sentence case from
 * @returns sentence case version of string
 */
export const ToSentenceCase = (string: string): string =>
  typeof string === 'string'
    ? string[0].toUpperCase() + string.substring(1).toLowerCase()
    : string

/**
 * determines the best way to display arbitrary data in string form
 * @param data to determine
 * @returns stringified data
 */
export const Stringify = (data: any): string => {
  if (Array.isArray(data)) return data.join('\n')
  else if (data) return ToSentenceCase(data)
  else return ''
}
