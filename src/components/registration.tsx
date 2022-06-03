/**
 * @name            Register
 * @version         1.0.0
 *
 * @fileoverview    Provides a user registration form component
 */

import React, {
  FormEventHandler,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react'
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap'
import { InputType } from 'reactstrap/types/lib/Input'
import {
  AuthState,
  GetAuth,
  IUser,
  Register as AuthRegister,
} from '../auth/auth'
import { ToSentenceCase } from '../util/string'

/**
 * Properties for Registration component
 */
interface IProps {
  Login: () => void
}

/**
 * Register a new user via a form with displayed validation
 * @param props for Register component
 * @returns A Registration form to create new users
 */
const Registration = (props: IProps): ReactElement => {
  const [User, SetUser] = useState<IUser>({})
  const [Error, SetError] = useState<boolean>(false)

  /**
   * Attempt to register credentials and login
   */
  const Register = async (): Promise<void> => {
    const state: AuthState = await AuthRegister(User)
    if (state === AuthState.Valid)
      if (GetAuth() != null) props.Login()
      else console.error('Unable to verify client is authenticated')
    else if (state === AuthState.Invalid || state === AuthState.Inscrutable)
      SetError(true)
  }

  /**
   * Called when form is submitted
   * @param e click event with submit button
   */
  const HandleSubmit: FormEventHandler<HTMLFormElement> = (
    e: SyntheticEvent
  ): void => {
    e.preventDefault()
    Register()
  }

  /**
   * renderers a form field sub-component
   * @param attribute in IUser to bind to
   * @param type input type
   * @param required must be assigned a value
   * @returns
   */
  const Field = (
    attribute: string,
    type?: InputType,
    required?: boolean
  ): ReactElement => {
    return (
      <FormGroup style={{ width: '100%' }}>
        <Input
          type={type || 'text'}
          name={attribute}
          placeholder={ToSentenceCase(attribute)}
          value={(User as { [key: string]: any })[attribute] || ''} // Must cast IUser to a string indexable object to use computed property accessor
          onChange={(e): void =>
            SetUser({ ...User, [attribute]: e.target.value })
          }
          required={required === undefined ? true : required}
        />
      </FormGroup>
    )
  }

  return (
    <section style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBlock: '1em' }}>Sign Up</h1>
      <Form onSubmit={HandleSubmit}>
        <section style={{ display: 'flex', gap: '1em' }}>
          {Field('first')}
          {Field('last')}
        </section>
        {Field('username')}
        <br />
        {Field('email', 'email')}
        {Field('password', 'password')}
        {Error ? (
          <Alert color="danger">
            There was a problem registering the new user
          </Alert>
        ) : (
          <></>
        )}
        <Button>Register</Button>
      </Form>
    </section>
  )
}

export default Registration
