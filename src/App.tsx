/**
 * @name          App
 * @version       1.0.0
 *
 * @fileoverview  Root component for Recipe Repository Application.
 */

import React, { ReactElement, useState } from 'react'
import { UserLogin } from './components/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/header'
import { GetAuth, Revoke } from './auth/auth'

export const API_BASE: string = 'https://id1000096681-laveat1.herokuapp.com'

/**
 * Application Component, root of component tree
 */
const App = (): ReactElement => {
  const [LoggedIn, SetLoggedIn] = useState<boolean>(GetAuth() != null)

  /**
   * Permit access to system routes
   */
  const Login = (): void => SetLoggedIn(true)

  /**
   * Revoke access to system routes
   */
  const Logout = (): void => {
    Revoke()
      .then(() => SetLoggedIn(false))
      .catch(() => alert('Failed to revoke Authentication!'))
  }

  return (
    <div className="App">
      <Router>
        <Header authenticated={LoggedIn} logout={Logout} />
        <Routes>
          {LoggedIn ? (
            <>
              <Route path="/ingredients" element={<h1>Ingredients</h1>} />
              <Route path="/utensils" element={<h1>Utensils</h1>} />
              <Route path="/components" element={<h1>Components</h1>} />
              <Route path="/recipes" element={<h1>Recipes</h1>} />
            </>
          ) : (
            <>
              <Route path="/login" element={<UserLogin Login={Login} />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  )
}

export default App
