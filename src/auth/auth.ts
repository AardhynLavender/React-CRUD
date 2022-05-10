/**
 * @name          Auth
 * @version       1.0.0
 *
 * @fileoverview  User authentication and associated types
 */

import axios from 'axios'

/**
 * Relevant HTTP codes
 */
export enum Code {
  Success = 200,
  Unauthorized = 401,
  NotFound = 404,
}

/**
 * an object used for authentication
 */
export interface ICredentials {
  username?: string
  password?: string
  email?: string
}

/**
 * the resulting state of a given authentication event
 */
export enum AuthState {
  Valid,
  Invalid,
  Inscrutable,
}

/**
 * Promises an authentication state based on given credentials against an endpoint
 * @param credentials credentials to authenticate
 * @param endpoint a url to pass **credentials** to
 * @returns a promise of an **AuthState**
 */
export const Authenticate = async (
  credentials: ICredentials,
  endpoint: string
): Promise<AuthState> => {
  // promise a state
  return new Promise(async (resolve, reject) => {
    try {
      // post credentials to endpoint
      const response = await axios.post(endpoint, credentials)

      // determine state
      if (response.status === Code.Success) {
        resolve(AuthState.Valid)
        sessionStorage.setItem('token', response.data.token) // authenticate this session
      } else if (response.status === Code.Unauthorized)
        reject(AuthState.Invalid)
    } catch (error) {
      reject(AuthState.Inscrutable)
    }
  })
}

/**
 * Get authentication if it exists
 * @returns promises a string containing authentication
 */
export const GetAuth = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const prefix: string = 'Bearer '
    const token: string | null = sessionStorage.getItem('token')
    if (token) resolve(prefix + token)
    else reject()
  })
}
