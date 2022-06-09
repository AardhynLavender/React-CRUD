
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
}

/**
 * A set of errors indexed by the associated (mongoDB) attribute
 */
export interface IErrorSet {
  [attribute: string]: IError
}

export const HandleError = (error : any) : IErrorSet | undefined => {
    console.error(error)

    // extract path
    const rawPath : string = error.response.data.message.path || 'inscrutable'
    const path : string = rawPath.includes('.') ? rawPath.split('.')[0] : rawPath;
    const errors : IErrorSet | undefined = error.response.data.message.errors

    // create error set
    const errorSet: IErrorSet | undefined = errors || {
        [path]: error.response.data.message,
    }

    return errorSet
}