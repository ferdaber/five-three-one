import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import { Home } from 'home'
import { Authenticate } from 'auth'

render(
  <Authenticate.Provider>
    <Authenticate>
      <Router basepath="/">
        <Home path="/" />
      </Router>
    </Authenticate>
  </Authenticate.Provider>,
  document.getElementById('root')
)
