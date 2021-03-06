/**
 * @name          Header
 * @version       1.0.0
 *
 * @fileoverview  Contains the header component to house the
 *                title and navigation components.
 */

import React, { ReactElement, useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap'

import Navigation from './navigation'

/**
 * properties for the Application component
 */
interface IProps {
  authenticated: boolean
  logout: () => void
}

/**
 * Application header component
 */
const Header = (props: IProps): ReactElement => {
  const title: string = 'Recipe Repository'
  const [open, setOpen] = useState<boolean>(false)
  const toggle = (): void => setOpen(!open)

  return (
    <header>
      <Navbar color="light" light expand="lg">
        <NavbarBrand href="/">{title}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Navigation
            authenticated={props.authenticated}
            logout={props.logout}
          />
        </Collapse>
      </Navbar>
    </header>
  )
}

export default Header
