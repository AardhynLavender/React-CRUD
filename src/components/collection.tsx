/**
 * @name            Collection
 * @version         1.0.0
 *
 * @fileoverview    fetches and displays data for a collection
 */

import React, { ReactElement, useEffect, useState } from 'react'
import TableView from './table'
import Axios, { AxiosResponse } from 'axios'
import { API_BASE } from '../App'
import { Code, GetAuth } from '../auth/auth'
import { Alert, Button, ButtonGroup } from 'reactstrap'
import { ToSentenceCase } from '../util/string'
import { Interaction } from '../util/Interaction'
import { Record } from '../util/record'
import {
  Paginate,
  IPageHandle,
  PaginationController,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from './pagination'

/**
 * Properties for this Component
 */
interface IProps {
  name: string
  schema: Array<string>
}

/**
 *
 * @param props provided the collection name and a desired schema
 * @returns
 */
export const Collection = (props: IProps): ReactElement => {
  const [Mode, SetMode] = useState<Interaction>(Interaction.Visual)
  const [Records, SetRecords] = useState<Array<Record> | undefined>(undefined)
  const [Error, SetError] = useState<boolean>(false)

  const API_COLLECTION_BASE: string = `${API_BASE}/api/v1/${props.name}/`

  /**
   * Read data from API
   */
  const fetch = (page?: number, size?: number) => {
    Axios.get(
      `${API_COLLECTION_BASE}?${Paginate(
        size || DEFAULT_PAGE_SIZE,
        page || DEFAULT_PAGE
      )}`,
      {
        headers: {
          authorization: GetAuth() || '',
        },
      }
    )
      .then((res: AxiosResponse) => {
        console.log('Resource acquisition successful')
        // data might be a string
        const data: Array<Record> | string = res.data.data
        if (res.status === Code.Success)
          SetRecords(typeof data === 'string' ? [] : data)
      })
      .catch((error: any) => {
        console.error(error || 'Unable to acquire resource!')
        SetError(true)
      })
  }

  /**
   * Promise to delete the document associated with the nth
   * (id) record on the display
   * @param id (local) of item to delete
   * @returns success of operation
   */
  const DeleteRecord = async (id: number): Promise<boolean> => {
    const _id: string | undefined = Records ? Records[id]._id : undefined
    try {
      if (_id) {
        const response: AxiosResponse = await Axios.delete(
          API_COLLECTION_BASE + _id,
          {
            headers: {
              authorization: GetAuth() || '',
            },
          }
        )

        if (response.status === Code.Success) {
          fetch() // refresh rendered collection data
          return true
        }
      }

      throw 'response status was not successful!'
    } catch (error: any) {
      console.error(error || 'Unable to delete resource!')
      return false
    }
  }

  /**
   * Promise to update a record in the collection
   * @param id (local) of item to delete
   * @returns success of operation
   */
  const MutateRecord = async (id: number): Promise<boolean> => {
    throw 'Unimplemented Symbol'
  }

  /**
   * Fetch when component did mount
   */
  useEffect(() => fetch(), [])

  /**
   * Toggle the interaction to Edit mode
   * @returns void
   */
  const HandleEdit = (): void =>
    SetMode(Mode === Interaction.Edit ? Interaction.Visual : Interaction.Edit)

  /**
   * Toggle the interaction to Delete mode
   * @returns void
   */
  const HandleDelete = (): void =>
    SetMode(
      Mode === Interaction.Delete ? Interaction.Visual : Interaction.Delete
    )

  return (
    <section
      style={{
        margin: '2em auto',
        paddingInline: '2em',
        width: '100%',
        maxWidth: '1200px',
        overflowX: 'scroll',
      }}
    >
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ marginBlock: '1em' }}>{ToSentenceCase(props.name)}</h2>
        <PaginationController
          initialState={{ page: DEFAULT_PAGE, size: DEFAULT_PAGE_SIZE }}
          SetState={(state: IPageHandle) => {
            fetch(state.page, state.size)
            console.log(state)
          }}
        />
        <ButtonGroup style={{ width: '150px' }}>
          <Button
            block={true}
            active={Mode === Interaction.Edit}
            outline={true}
            onClick={HandleEdit}
          >
            Edit
          </Button>
          <Button
            block={true}
            active={Mode === Interaction.Delete}
            outline={true}
            onClick={HandleDelete}
          >
            Delete
          </Button>
        </ButtonGroup>
      </section>
      {Error ? (
        <Alert color="danger">
          There was a problem retrieving {props.name}!
        </Alert>
      ) : (
        <TableView
          name={props.name}
          attributes={props.schema}
          records={Records}
          mode={Mode}
          handleDelete={DeleteRecord}
          handleUpdate={MutateRecord}
        />
      )}
    </section>
  )
}
