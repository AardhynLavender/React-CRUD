/**
 * @name            Navigation
 * @version         1.0.0
 *
 * @fileoverview    The Navigation component, groups a set of links together
 */

import React, { ReactElement } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

/**
 *  Navigation links and
 */
const Navigation = (): ReactElement => {
  return (
    <Nav className="ms-auto" navbar>
      <NavItem>
        <NavLink href="/login">Login</NavLink>
      </NavItem>
    </Nav>
  )
}

export default Navigation
