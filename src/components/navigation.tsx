/**
 * @name            Navigation
 * @version         1.0.0
 *
 * @fileoverview    Provides a component to group stateful links together
 */

import React, { ReactElement } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

/**
 * Properties for the Navigation component
 */
interface IProps {
  authenticated: boolean
  logout: () => void
}

/**
 * displays links based on auth state
 * @param props component properties
 * @returns a navigation bar
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
          <NavItem>
            <NavLink href="/register">Sign Up</NavLink>
          </NavItem>
        </>
      )}
    </Nav>
  )
}

export default Navigation
