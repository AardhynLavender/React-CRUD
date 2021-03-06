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
import { GetAuth } from '../auth/auth'
import { Alert, Button, ButtonGroup } from 'reactstrap'
import { ToSentenceCase } from '../util/string'
import Interaction from '../util/interaction'
import { IRecord } from '../util/record'
import PaginationController, {
  Paginate,
  IPaginationState,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from './pagination'
import { useParams } from 'react-router-dom'
import NewRecord from './newRecord'
import { Code } from '../util/code'
import { HandleError, IErrorSet } from '../util/error'
import path from 'path'

/**
 * Properties for this Component
 */
interface IProps {
  name: string
  schema: Array<string>
}

/**
 * A CRUD interface for a collection
 * @param props provided the collection name and a desired schema
 * @returns a CRUD interface
 */
export const Collection = (props: IProps): ReactElement => {
  const [Mode, SetMode] = useState<Interaction>(Interaction.Visual)
  const [Records, SetRecords] = useState<Array<IRecord> | undefined>(undefined)
  const [Error, SetError] = useState<boolean>(false)

  const { id } = useParams<string>()

  const API_COLLECTION_BASE: string = `${API_BASE}/api/v1/${props.name}/`

  /**
   * Read data from API
   */
  const Fetch = (page?: number, size?: number) => {
    // sequential id for document
    const parsedID: number | undefined = parseInt(id || '')

    const validID: boolean =
      parsedID != undefined &&
      typeof parsedID === 'number' &&
      !isNaN(parsedID) &&
      parsedID > -1

    Axios.get(
      `${API_COLLECTION_BASE}${
        validID
          ? // sequential ID must be pagination independent
            ''
          : Paginate(size || DEFAULT_PAGE_SIZE, page || DEFAULT_PAGE)
      }`,
      {
        headers: {
          authorization: GetAuth() || '',
        },
      }
    )
      .then((res: AxiosResponse) => {
        console.log('Resource acquisition successful')
        // data might be a string
        const data: Array<IRecord> | string = res.data.data
        if (res.status === Code.Success)
          SetRecords(
            typeof data === 'string'
              ? // return an empty array for no data
                []
              : // return a single document if a valid ID is passed
              validID && parsedID < data.length
              ? [data[parsedID]]
              : // else return all data
                data
          )
      })
      .catch((error: any) => {
        console.error(error || 'Unable to acquire resource!')
        SetError(true)
      })
  }

  /**
   * Promise to delete the document associated with the nth
   * record on the display
   * @param id (local) of item to delete
   * @returns success of operation
   */
  const DeleteRecord = async (id: number): Promise<boolean> => {
    // extrapolate document hash (_id)
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
          Fetch() // refresh rendered collection data
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
  const PushRecord = async (
    record: IRecord
  ): Promise<IErrorSet | undefined> => {
    try {
      if (!record) throw 'mutation was undefined!'

      const response: AxiosResponse = await Axios.post(
        API_COLLECTION_BASE,
        record,
        {
          headers: {
            authorization: GetAuth() || '',
          },
        }
      )

      Fetch() // refresh rendered collection data
      if (response.status !== Code.Created)
        throw 'response status was not successful!'
    } catch (error: any) {
      return HandleError(error)
    }
  }
  /**
   * Promise to update a record in the collection
   * @param id (local) of item to delete
   * @returns success of operation
   */
  const MutateRecord = async (
    id: number,
    mutated: IRecord
  ): Promise<IErrorSet | undefined> => {
    try {
      if (!mutated) throw 'mutation was undefined!'

      const _id: string | undefined = Records ? Records[id]._id : undefined
      const response: AxiosResponse = await Axios.put(
        API_COLLECTION_BASE + _id,
        mutated,
        {
          headers: {
            authorization: GetAuth() || '',
          },
        }
      )

      Fetch() // refresh rendered collection data
      if (response.status !== Code.Success)
        throw 'response status was not successful!'
    } catch (error: any) {
      return HandleError(error)
    }
  }

  /**
   * Fetch when component did mount
   */
  useEffect(() => Fetch(), [])

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
          SetState={(state: IPaginationState) => {
            Fetch(state.page, state.size)
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
          HandleDelete={DeleteRecord}
          HandleUpdate={MutateRecord}
        />
      )}
      <br />
      <NewRecord attributes={props.schema} pushRecord={PushRecord} />
    </section>
  )
}
