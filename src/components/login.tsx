/**
 * @name          Login
 * @version       1.0.0
 *
 * @fileoverview  Login form to authenticate a user and
 *                permit access to the system
 */

import React, {
  FormEventHandler,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react'

import { Button, Alert, Form, FormGroup, Input } from 'reactstrap'
import { API_BASE } from '../App'
import { Authenticate, AuthState, GetAuth, ICredentials } from '../auth/auth'

interface IProps {
  Login: () => void
}

/**
 * Login form Component
 */
export const UserLogin = (props: IProps): ReactElement => {
  // credentials
  const [Email, SetEmail] = useState<string>('')
  const [Password, SetPassword] = useState<string>('')

  // authentication
  const [Invalid, SetInvalid] = useState<boolean>(false)
  const [Inscrutable, SetInscrutable] = useState<boolean>(false)

  /**
   * Attempt to log the user in
   */
  const Login = async (): Promise<void> => {
    // attempt to authenticate
    const state = await Authenticate(
      {
        email: Email,
        password: Password,
      },
      `${API_BASE}/login`
    )

    // check state
    if (state === AuthState.Valid)
      if (GetAuth() != null) props.Login()
      else console.error('Unable to verify client is authenticated')
    else if (state === AuthState.Invalid) SetInvalid(true)
    else SetInscrutable(true)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: SyntheticEvent
  ): void => {
    e.preventDefault()
    Login()
  }

  return (
    <section style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBlock: '1em' }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={Email}
            onChange={(e): void => SetEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={Password}
            onChange={(e): void => SetPassword(e.target.value)}
            required
          />
        </FormGroup>

        {Invalid ? (
          <Alert color="danger">
            Cannot recognize your credentials; Please try again.
          </Alert>
        ) : (
          <></>
        )}
        {Inscrutable ? (
          <Alert color="danger">
            There was a problem submitting your credentials.
          </Alert>
        ) : (
          <></>
        )}
        <Button>Submit</Button>
      </Form>
    </section>
  )
}
