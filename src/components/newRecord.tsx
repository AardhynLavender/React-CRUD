/**
 * @name            Record
 * @version         1.0.0
 *
 * @fileoverview    A component to provide collection input functionality
 */

import React, {
  FormEventHandler,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react'
import { IRecord } from '../util/record'
import { IErrorSet } from '../util/error'
import { ToSentenceCase } from '../util/string'
import { Button, Form, Table } from 'reactstrap'

/**
 * Properties for the NewRecord component
 */
interface IProps {
  attributes: Array<string>
  pushRecord: (record: IRecord) => Promise<IErrorSet | undefined>
}

/**
 * A form that adds new records to a collection
 * @param props properties for NewRecord Component
 * @returns a new Record form component
 */
const NewRecord = (props: IProps): ReactElement => {
  const { attributes } = props

  const [RecordState, SetRecordState] = useState<IRecord>({})
  const [Error, SetError] = useState<string>()

  /**
   * Invoked when a Form is submitted
   */
  const HandleSubmit: FormEventHandler<HTMLFormElement> = (
    e: SyntheticEvent
  ): void => {
    e.preventDefault()
    props.pushRecord(RecordState).then((errorSet: IErrorSet | undefined) => {
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
    <>
      <h3>Create</h3>
      <Form
        onSubmit={HandleSubmit}
        style={{
          width: '100%',
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          marginBlock: '1em',
        }}
      >
        {attributes.map((attribute: string, key: number) => (
          <input
            onChange={({ target }) => HandleChange(target.value, attribute)}
            placeholder={ToSentenceCase(attribute)}
            value={RecordState[attribute]}
          />
        ))}
        <Button style={{ width: '5em' }}>Submit</Button>
      </Form>
    </>
  )
}

export default NewRecord
