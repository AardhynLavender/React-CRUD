/**
 * @name          Auth
 * @version       1.0.0
 *
 * @fileoverview  User authentication and associated types
 */

import axios from 'axios'
import { API_BASE } from '../App'
import { AxiosResponse } from 'axios'

/**
 * Relevant HTTP codes
 */
export enum Code {
  Success = 200,
  Created = 201,
  Unauthorized = 401,
  NotFound = 404,
  Error = 500,
}

/**
 * an object used for authentication
 */
export interface ICredentials {
  username?: string
  password?: string
  email?: string
}

export interface IUser extends ICredentials {
  first?: string
  last?: string
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
  // post credentials to endpoint
  try {
    const response: AxiosResponse = await axios.post(endpoint, credentials)
    sessionStorage.setItem('token', response.data.token) // authenticate this session
    return AuthState.Valid
  } catch (err: any) {
    if (err.response.status === Code.Error) return AuthState.Invalid
    else return AuthState.Inscrutable
  }
}

/**
 * Revokes the session authentication
 */
export const Revoke = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE}/logout`)
    if (response.status === Code.Success) sessionStorage.clear()
  } catch (error: any) {
    console.error(error)
  }
}

/**
 * Register a new user in the system
 * @param user to register
 * @returns promises an **AuthState**
 */
export const Register = async (user: IUser): Promise<AuthState> => {
  try {
    if (!user) throw 'user was undefined'

    // ship credentials
    const { username, password, email, first, last } = user
    const response: AxiosResponse = await axios.post(`${API_BASE}/register`, {
      name: { first, last }, // add nesting
      username,
      email,
      password,
    })

    // authenticate this session
    sessionStorage.setItem('token', response.data.token)
    return AuthState.Valid
  } catch (err: any) {
    if (err.response.status === Code.Error) return AuthState.Invalid
    else return AuthState.Inscrutable
  }
}

/**
 * Get authentication if it exists
 * @returns the bearer token if it exists
 */
export const GetAuth = (): string | null => {
  const prefix: string = 'Bearer '
  const token: string | null = sessionStorage.getItem('token')
  if (token) return prefix + token
  else return null
}
