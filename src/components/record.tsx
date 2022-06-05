/**
 * @name            Record
 * @version         1.0.0
 *
 * @fileoverview    Displays a mutable record of data with callback arguments
 */

import React, { ReactElement, useState } from 'react'
import { Button } from 'reactstrap'
import { Stringify } from '../util/collection'
import { Interaction } from '../util/Interaction'
import { IRecord } from '../util/record'
import { ToSentenceCase } from '../util/string'
import { IErrorSet } from './collection'

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

const Record = (props: IProps): ReactElement => {
  const { id, attributes, record, mode, Editing, HandleDelete } = props

  const [RecordState, SetRecordState] = useState<IRecord>(record)
  const [Error, SetError] = useState<string>()

  /**
   * Called when Edit is clicked
   */
  const HandleMutate = (): void => {
    SetRecordState(record)
    props.SetEditing(id)
  }

  const HandleCommit = (): void => {
    props
      .HandleCommit(id, RecordState)
      .then((errorSet: IErrorSet | undefined) => {
        props.SetEditing(null)
        if (errorSet) {
          Object.keys(errorSet).forEach((attribute: string) => {
            const { name, message, path } = errorSet[attribute]
            alert(
              // for now... just use vanilla alert
              `${name} with ${path ? path.split('.')[0] : ''}\n\n${message}`
            )
          })
        }
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
            </td>
          ) : (
            <td key={key}>{Stringify(record[attribute])}</td>
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
