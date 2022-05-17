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
  // post credentials to endpoint
  try {
    const response: AxiosResponse = await axios.post(endpoint, credentials)
    sessionStorage.setItem('token', response.data.token) // authenticate this session
    return AuthState.Valid
  } catch (err: any) {
    if (err.response.status === Code.Unauthorized) return AuthState.Invalid
    else return AuthState.Inscrutable
  }
}

/**
 * Revokes the session authentication
 */
export const Revoke = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE}/logout`)
    if (response.status === Code.Success) sessionStorage.clear()
  } catch (error: any) {
    console.error(error)
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
