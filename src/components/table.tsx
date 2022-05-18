/**
 * @name            Table
 * @version         1.0.0
 *
 * @fileoverview    A component to display data in a table
 */

import React, { ReactElement, useEffect, useState } from 'react'
import { Alert, Table } from 'reactstrap'
import { ToSentenceCase } from '../util/string'

/**
 * Properties for this Component
 */
interface IProps {
  name?: string
  attributes: Array<string>
  records?: Array<object>
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
  // extract properties
  const name: string = props.name || 'untitled'
  const attributes: Array<string> = props.attributes
  const records: Array<object> = props.records || []

  return (
    <>
      <Table>
        <thead>
          <tr>
            {attributes.map((attribute) => (
              <th>{ToSentenceCase(attribute)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record: TStringIndexed) => (
            <tr>
              {attributes.map((attribute: string) => {
                const datum: any = record[attribute]
                return (
                  <td>
                    {typeof datum === 'string'
                      ? record[attribute].toLowerCase()
                      : datum || ''}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      {records.length == 0 ? <Alert>Loading {props.name}...</Alert> : <></>}
    </>
  )
}

export default TableView
