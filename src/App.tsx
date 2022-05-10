/**
 * @name          App
 * @version       1.0.0
 *
 * @fileoverview  Root component for Recipe Repository Application.
 */

import React, { ReactElement, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Authenticate, AuthState, GetAuth } from './auth/auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/header'

export const API_BASE: string = 'https://id1000096681-laveat1.herokuapp.com'
/**
 * Application Component, root of component tree
 */
const App = (): ReactElement => {
  useEffect(() => {
    // Simple Auth example
    Authenticate(
      { username: 'seeded_user', password: 'justin bailey' },
      `${API_BASE}/login`
    )
      .then((state: AuthState) => {
        GetAuth()
          .then((token: string) => {
            axios
              .get(`${API_BASE}/api/v1/ingredients`, {
                headers: {
                  Authorization: token,
                },
              })
              .then((data: AxiosResponse) => {
                console.log(data)
              })
          })
          .catch(() => {
            console.error('Unable to acquire required auth token!')
          })
      })
      .catch((state: AuthState) => {
        if (state === AuthState.Invalid) console.log('Invalid Credentials!')
        else console.error('Auth Failed!')
      })
  }, [])

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
