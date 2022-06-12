/**
 * @name          Error
 * @version       1.0.0
 *
 * @fileoverview  Error alert message component
 */

import React, { ReactElement } from 'react'
import { Alert } from 'reactstrap'
import { IErrorSet } from '../util/error'

/**
 * Properties for Error component
 */
interface IProps {
  error: IErrorSet
  attribute: string
}

/**
 * Displays any messages from the `error` that relate to the `attribute`
 * @param props properties
 * @returns an Error alert message
 */
const Error = (props: IProps): ReactElement => {
  const { error, attribute } = props
  return (
    <section style={{ display: 'flex', flexDirection: 'column' }}>
      {Object.keys(error).includes(attribute) ? (
        <>
          <Alert
            color={error[attribute].name === 'CastError' ? 'warning' : 'danger'}
            style={{ marginTop: '1em' }}
          >
            <b>{error[attribute].name}</b>
            <br />
            <em>{error[attribute].message}</em>
          </Alert>
        </>
      ) : (
        <></>
      )}
    </section>
  )
}

export default Error
