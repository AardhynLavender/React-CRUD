/**
 * @name          App
 * @version       1.0.0
 *
 * @fileoverview  Root component for Recipe Repository Application.
 */

import React, { ReactElement } from 'react'

import Header from './components/header'

/**
 * Application Component, root of component tree
 */
const App = (): ReactElement => {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
    </div>
  )
}

export default App
