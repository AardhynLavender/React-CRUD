/**
 * @name            Table
 * @version         1.0.0
 *
 * @fileoverview    A component to display data in a table
 */

import React, { ReactElement, useState } from 'react'
import { Table } from 'reactstrap'

/**
 * Displays provided data in a table
 */
const CrudTable = () : ReactElement => {
    return <>
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Region</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Stanford University</td>
                    <td>California</td>
                    <td>United States of America</td>
                </tr>
                <tr>
                    <td>Harvard University</td>
                    <td>Massachusetts</td>
                    <td>United States of America</td>
                </tr>
                <tr>
                    <td>University of Oxford</td>
                    <td>Oxford</td>
                    <td>United Kingdom</td>
                </tr>
            </tbody>
        </Table>
    </>
}

export default CrudTable