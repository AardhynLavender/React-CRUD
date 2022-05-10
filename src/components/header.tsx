/**
 * @name          Header
 * @version       1.0.0
 *
 * @fileoverview  Contains the header component which houses the
 *                title and navigation components.
 */

import React, { ReactElement, useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap'

import Navigation from './navigation'

/**
 * Application Component, root of component tree
 */
const Header = (): ReactElement => {
  const title: string = 'Recipe Repository'
  const [open, setOpen] = useState<boolean>(false)
  const toggle = (): void => setOpen(!open)

  return (
    <header>
      <Navbar color="light" light expand="lg">
        <NavbarBrand href="/">{title}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Navigation />
        </Collapse>
      </Navbar>
    </header>
  )
}

export default Header
