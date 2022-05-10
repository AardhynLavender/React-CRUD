/**
 * @name          App
 * @version       1.0.0
 *
 * @fileoverview  Root component for Recipe Repository Application.
 */

import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/header'

/**
 * Application Component, root of component tree
 */
const App = (): ReactElement => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" />
          <Route path="/ingredients" element={<h1>Ingredients</h1>} />
          <Route path="/utensils" element={<h1>Utensils</h1>} />
          <Route path="/components" element={<h1>Components</h1>} />
          <Route path="/recipes" element={<h1>Recipes</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
