/**
 * @name            Table
 * @version         1.0.0
 *
 * @fileoverview    A component to display data in a table
 */

import React, { ReactElement, useState } from 'react'
import { Alert, Spinner, Table } from 'reactstrap'
import { Interaction } from '../util/Interaction'
import { ToSentenceCase } from '../util/string'
import { IRecord } from '../util/record'
import Record from './record'
import { IErrorSet } from './collection'

/**
 * Properties for the TableView component
 */
interface IProps {
  name?: string
  attributes: Array<string>
  records?: Array<IRecord>
  mode: Interaction
  HandleDelete: (id: number) => Promise<boolean>
  HandleUpdate: (id: number, mutated: IRecord) => Promise<IErrorSet | undefined>
}

/**
 * Displays provided data in a table
 * @param props Component Properties
 * @returns Table View Component
 */
const TableView = (props: IProps): ReactElement => {
  const { attributes, records } = props

  const [Editing, SetEditing] = useState<number | null>(null)

  /**
   * Prompt user for a delete request
   * @param id of record to request deletion
   * @returns promises to determine user input
   */
  const HandleDelete = (id: number): Promise<boolean> => {
    if (
      confirm(
        `Delete record ${id} from the ${ToSentenceCase(
          props.name || 'untitled'
        )} collection?`
      )
    ) {
      return props.HandleDelete(id)
    } else throw false
  }

  /**
   * Request to set the record being edited
   * @param id to be edited
   * @returns if request is granted
   */
  const HandleSetEditing = (id: number | null): boolean => {
    const success: boolean =
      !id || (records != undefined && id > -1 && id < records.length)
    if (success) SetEditing(id)
    return success
  }

  return (
    <>
      <Table>
        <thead>
          <tr style={{ width: 0.1, whiteSpace: 'nowrap' }}>
            <th key="0">Local ID</th>
            {attributes.map((attribute: string, key: number) => (
              <th key={key}>{ToSentenceCase(attribute)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records ? (
            records.map((record: IRecord, id: number) => (
              <Record
                key={id}
                attributes={attributes}
                record={record}
                mode={props.mode}
                SetEditing={HandleSetEditing}
                HandleDelete={HandleDelete}
                HandleCommit={props.HandleUpdate}
                id={id}
                Editing={Editing}
              />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
      {/* Display loading alert while awaiting response */}
      {!records ? (
        <Alert style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
          <Spinner animation="border" />
          Loading {props.name}
        </Alert>
      ) : !records.length ? (
        // No data was present...
        <Alert color="primary">
          <em>No {props.name} found</em>
        </Alert>
      ) : (
        <></>
      )}
    </>
  )
}

export default TableView
