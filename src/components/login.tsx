/**
 * @name          Login
 * @version       1.0.0
 *
 * @fileoverview  Login form to authenticate a user and
 *                permit access to the systems routes
 */

import React, {
  FormEventHandler,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react'

import { Button, Alert, Form, FormGroup, Input } from 'reactstrap'
import { API_BASE } from '../App'
import { Authenticate, AuthState, GetAuth } from '../auth/auth'

/**
 * Properties for the Login component
 */
interface IProps {
  Login: () => void
}

/**
 * Login form Component
 */
const Login = (props: IProps): ReactElement => {
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

  /**
   * Invoked when a Form is submitted
   * @param e form event
   */
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
            onChange={({ target }): void => SetEmail(target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={Password}
            onChange={({ target }): void => SetPassword(target.value)}
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

export default Login
