/**
 * @name            Collection
 * @version         1.0.0
 *
 * @fileoverview    Functions relating to collections
 */

import { ToSentenceCase } from './string'

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
