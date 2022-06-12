/**
 * @name          Error
 * @version       1.0.0
 *
 * @fileoverview  Error related interfaces
 */

/**
 * A specific error
 */
export interface IError {
  name: string
  message: string
  path?: string
  code?: number
}

/**
 * A set of errors indexed by the associated (mongoDB) attribute
 */
export interface IErrorSet {
  [attribute: string]: IError
}

export const HandleError = (error: any): IErrorSet | undefined => {
  console.error(error)

  // extract path
  const rawPath: string = error.response.data.message.path || ''
  const path: string = rawPath.includes('.') ? rawPath.split('.')[0] : rawPath
  const errors: IErrorSet | undefined = error.response.data.message.errors
  const key = Object.keys(error.response.data.message.keyPattern || {})[0]

  // create error set
  const errorSet: IErrorSet | undefined =
    // standard errors
    errors ||
    (path
      ? // probably cast error
        { [path]: error.response.data.message }
      : // most likley a unique constraint issuse
        {
          [key || 'inscrutable']: {
            name: 'NotUnique',
            path: key,
            message: `path '${key}' does not contain a unique value`,
          },
        })

  console.log(errorSet)

  return errorSet
}
