/**
 * @name            Collection
 * @version         1.0.0
 *
 * @fileoverview    fetches and displays data for a collection
 */

import React, { ReactElement, useEffect, useState } from 'react'
import CrudTable from './table'
import Axios, { AxiosResponse } from 'axios'
import { API_BASE } from '../App'
import { Code, GetAuth } from '../auth/auth'
import { Alert } from 'reactstrap'
import { ToSentenceCase } from '../util/string'

/**
 * Properties for this Component
 */
interface IProps {
  name: string
  schema: Array<string>
}

export const Collection = (props: IProps): ReactElement => {
  const [Records, SetRecords] = useState<Array<object> | undefined>([])
  const [Error, SetError] = useState<boolean>(false)

  const fetch = () => {
    Axios.get(`${API_BASE}/api/v1/${props.name}`, {
      headers: {
        authorization: GetAuth() || '',
      },
    })
      .then((res: AxiosResponse) => {
        if (res.status === Code.Success) SetRecords(res.data.data)
      })
      .catch((error: any) => {
        SetError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section
      style={{
        margin: '2em auto',
        paddingInline: '2em',
        width: '100%',
        maxWidth: '1000px',
      }}
    >
      <h2 style={{ marginBlock: '1em' }}>{ToSentenceCase(props.name)}</h2>
      {Error ? (
        <Alert color="danger">
          There was a problem retrieving {props.name}!
        </Alert>
      ) : (
        <CrudTable
          name={props.name}
          attributes={props.schema}
          records={Records}
        />
      )}
    </section>
  )
}
