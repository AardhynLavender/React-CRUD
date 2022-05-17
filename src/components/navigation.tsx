/**
 * @name            Navigation
 * @version         1.0.0
 *
 * @fileoverview    The Navigation component, groups a set of links together
 */

import React, { ReactElement } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

interface IProps {
  authenticated: boolean
  logout: () => void
}

/**
 *  Navigation links auth dependant
 */
const Navigation = (props: IProps): ReactElement => {
  return (
    <Nav className="ms-auto" navbar>
      {props.authenticated ? (
        <>
          <NavItem>
            <NavLink href="/ingredients">Ingredients</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/utensils">Utensils</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/components">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/recipes">Recipes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={props.logout}>Logout</NavLink>
          </NavItem>
        </>
      ) : (
        <>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
        </>
      )}
    </Nav>
  )
}

export default Navigation
