/**
 * @name          App
 * @version       1.0.0
 *
 * @fileoverview  Root component for Recipe Repository Application.
 */

import React, { ReactElement, useEffect, useState } from 'react'
import { UserLogin } from './components/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/header'
import { Code, GetAuth, Revoke } from './auth/auth'
import { Collection } from './components/collection'

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
              <Route
                path="/ingredients"
                element={
                  <Collection
                    name="ingredients"
                    schema={['name', 'description', 'brand', 'type']}
                  />
                }
              />
              <Route
                path="/utensils"
                element={
                  <Collection
                    name="utensils"
                    schema={[
                      'name',
                      'material',
                      'size',
                      'measurement',
                      'description',
                    ]}
                  />
                }
              />
              <Route
                path="/components"
                element={
                  <Collection
                    name="components"
                    schema={[
                      'name',
                      'author',
                      'condiments',
                      'utensils',
                      'method',
                      'results',
                    ]}
                  />
                }
              />
              <Route
                path="/recipes"
                element={
                  <Collection
                    name="recipes"
                    schema={['name', 'author', 'components', 'details']}
                  />
                }
              />
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
