/**
 * @name            Table
 * @version         1.0.0
 *
 * @fileoverview    A component to display data in a table
 */

import React, { ReactElement, useEffect, useState } from 'react'
import { Table } from 'reactstrap'
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
    <section style={{ margin: '0 auto', width: '100%', maxWidth: '1000px' }}>
      <h2 style={{ marginBlock: '1em' }}>{ToSentenceCase(name)}</h2>
      <Table>
        <thead>
          <tr>
            {attributes.map((attribute) => (
              <th>{ToSentenceCase(attribute)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.length == 0
            ? 'loading...' // TODO replace with fancier loading animation
            : records.map((record: TStringIndexed) => (
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
    </section>
  )
}

export default TableView
