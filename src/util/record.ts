/**
 * @name          Record
 * @version       1.0.0
 *
 * @fileoverview  An arbitrary string indexed object with an _id
 */

/**
 * An arbitrary string indexed object with an _id
 */
export interface IRecord extends Object {
  _id?: string
  [attribute: string]: any
}
