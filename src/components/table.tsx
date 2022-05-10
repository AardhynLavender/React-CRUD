/**
 * @name            Table
 * @version         1.0.0
 *
 * @fileoverview    A component to display data in a table
 */

import React, { ReactElement, useEffect, useState } from 'react'
import { Table } from 'reactstrap'

/**
 * Properties for this Component
 */
interface IProps {
  name?: string
  columns: Array<string>
  data?: Array<object>
}

/**
 * Displays provided data in a table
 * @param props Component Properties
 * @returns Table View Component
 */
const TableView = (props: IProps): ReactElement => {
  // extract properties
  const name: string = props.name || 'untitled'
  const columns: Array<string> = props.columns
  const data: Array<object> = props.data || []

  return (
    <>
      <br />
      <h2>{name}</h2>
      <Table>
        <thead>
          <tr>
            {/* Create column headings */}
            {columns.map((heading) => (
              <th>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Create records */}
          {data.map((record: object) => (
            <tr>
              {Object.values(record).map((attribute: string) => (
                <td>{attribute}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default TableView
