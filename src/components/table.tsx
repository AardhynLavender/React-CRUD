/**
 * @name            Table
 * @version         1.0.0
 *
 * @fileoverview    A component to display data in a table
 */

import React, { ReactElement, useEffect, useState } from 'react'
import { Alert, Button, ButtonGroup, Spinner, Table } from 'reactstrap'
import { Interaction } from '../util/Interaction'
import { ToSentenceCase } from '../util/string'
import { Record } from '../util/record'

/**
 * An action performed on a table
 */
type Mutation = (id: number) => Promise<boolean>

/**
 * Properties for this Component
 */
interface IProps {
  name?: string
  attributes: Array<string>
  records?: Array<Record>
  mode: Interaction
  handleDelete: Mutation
  handleUpdate: Mutation
}

/**
 * An object indexed by a string
 */
type TStringIndexed = { [key: string]: any }

/**
 * Displays provided data in a table
 * @param props Component Properties
 * @returns Table View Component
 */
const TableView = (props: IProps): ReactElement => {
  const attributes: Array<string> = props.attributes
  const records: Array<object> | undefined = props.records

  /**
   * determines the best way to display arbitrary data in string form
   * @param data to determine
   * @returns stringified data
   */
  const Stringify = (data: any): string => {
    if (Array.isArray(data)) return data.join('\n')
    else if (data) return ToSentenceCase(data)
    else return ''
  }

  /**
   * Handle a delete request
   * @param id of record to request deletion
   */
  const HandleDelete = (id: number): void => {
    if (
      confirm(
        `Delete record ${id} from the ${ToSentenceCase(
          props.name || 'untitled'
        )} collection?`
      )
    ) {
      props.handleDelete(id).then((success) => {
        if (success) {
          // toast user
        }
      })
    } else {
      // toast user
    }
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
            records.map((record: TStringIndexed, id: number) => (
              <tr key={id}>
                <td key={0}>{id}</td>
                {/* Display attributes */}
                {attributes.map((attribute: string, key: number) => (
                  <td key={key}>{Stringify(record[attribute])}</td>
                ))}
                {/* Display Edit or Delete button */}
                {props.mode != Interaction.Visual ? (
                  <td key={attributes.length} style={{ width: 50 }}>
                    {props.mode === Interaction.Edit ? (
                      <Button color="warning">Edit</Button>
                    ) : props.mode === Interaction.Delete ? (
                      <Button
                        color="danger"
                        onClick={(): void => HandleDelete(id)}
                      >
                        Delete
                      </Button>
                    ) : (
                      <></>
                    )}
                  </td>
                ) : (
                  <></>
                )}
              </tr>
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
