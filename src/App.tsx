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

  /**
   * Collections to provide
   */
  const collections: Record<string, Array<string>> = {
    ingredients: ['name', 'description', 'brand', 'type'],
    utensils: ['name', 'material', 'size', 'measurement', 'description'],
    components: [
      'name',
      'author',
      'condiments',
      'utensils',
      'method',
      'results',
    ],
    recipes: ['name', 'author', 'components', 'details'],
  }

  return (
    <div className="App">
      <Router>
        <Header authenticated={LoggedIn} logout={Logout} />
        <Routes>
          {LoggedIn ? (
            Object.entries(collections).map(([collection, schema]) => (
              <Route path={`/${collection}/`}>
                <Route
                  path=":id"
                  element={<Collection name={collection} schema={schema} />}
                />
                <Route
                  path=""
                  element={<Collection name={collection} schema={schema} />}
                />
              </Route>
            ))
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
