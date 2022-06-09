/**
 * @name            Record
 * @version         1.0.0
 *
 * @fileoverview    Displays a mutable record of data with callback arguments
 */

import React, { ReactElement, useState } from 'react'
import { Alert, Button } from 'reactstrap'
import { Interaction } from '../util/interaction'
import { IRecord } from '../util/record'
import { Stringify } from '../util/string'
import { IErrorSet } from '../util/error'

/**
 * Properties for the Record component
 */
interface IProps {
  id: number
  attributes: Array<string>
  record: IRecord
  mode: Interaction
  Editing: number | null
  SetEditing: (id: number | null) => boolean
  HandleCommit: (
    id: number,
    mutation: IRecord
  ) => Promise<IErrorSet | undefined>
  HandleDelete: (id: number) => Promise<boolean>
}

/**
 * Displays a mutable record with edit and delete buttons
 * @param props properties
 * @returns a mutable record component
 */
const Record = (props: IProps): ReactElement => {
  const { id, attributes, record, mode, Editing, HandleDelete } = props

  const [RecordState, SetRecordState] = useState<IRecord>(record)
  const [Error, SetError] = useState<IErrorSet | null>(null)

  /**
   * Called when Edit is clicked
   */
  const HandleMutate = (): void => {
    SetError(null);
    SetRecordState(record)
    props.SetEditing(id)
  }

  /**
   * Handles clicking the 'commit' button
   */
  const HandleCommit = (): void => {
    props
      .HandleCommit(id, RecordState)
      .then((errorSet: IErrorSet | undefined) => {
        if (errorSet)
          Object.keys(errorSet).forEach((attribute: string) => SetError(errorSet))
        else props.SetEditing(null)
      })
  }

  /**
   * Called when a change is registered in a record attribute field
   * @param change to attribute being changed
   * @param attribute being changed
   */
  const HandleChange = (change: string, attribute: string): void => {
    // determine if singular or array based on plurality of attribute
    if (attribute[attribute.length - 1].toLowerCase() === 's') {
      // extrapolate array
      const changeArray: Array<string> = change.split(',')
      const empty: boolean = changeArray.length == 1 && changeArray[0] === '' // is the array 'empty' -- '' would resolve to a length of one

      SetRecordState({
        ...RecordState,
        [attribute]: empty ? [] : changeArray,
      })
    }
    // push all data into state
    else
      SetRecordState({
        ...RecordState,
        [attribute]: change,
      })
  }

  return (
    <tr>
      <td>{id}</td>
      {/* Display attributes */}
      {attributes.map((attribute: string, key: number) => (
        <>
          {Editing === id && mode === Interaction.Edit ? (
            <td key={key}>
              <textarea
                onChange={({ target }) => HandleChange(target.value, attribute)}
                value={RecordState[attribute]}
              />
              <div
                style={{ display : 'flex', flexDirection: "column" }}
              >
                { Error && Object.keys(Error).includes(attribute) ? <>
                  <Alert color={Error[attribute].name === 'CastError' ? "warning" : "danger"} style={{ marginTop: 'auto'}}>
                    <b>{Error[attribute].name}</b>
                    <br/>
                    <em>{Error[attribute].message}</em>
                  </Alert>
                </> : <></>}
              </div>
            </td>
            ) : (
              <td key={key} 
              >
              {Stringify(record[attribute])}
            </td>
          )}
        </>
      ))}
      {/* Display Edit or Delete button */}
      {props.mode != Interaction.Visual ? (
        <td key={attributes.length} style={{ width: 50 }}>
          {mode === Interaction.Edit ? (
            <>
              {/* Edit or Commit edit*/}
              {Editing === id ? (
                <Button color="success" onClick={HandleCommit}>
                  Commit
                </Button>
              ) : (
                <Button color="warning" onClick={HandleMutate}>
                  Edit
                </Button>
              )}
            </>
          ) : mode === Interaction.Delete ? (
            <Button
              color="danger"
              onClick={(): void => {
                HandleDelete(id)
              }}
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
  )
}

export default Record
