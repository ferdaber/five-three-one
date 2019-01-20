import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import { Home } from './home'

render(
  <Router basepath="/">
    <Home path="/" />
  </Router>,
  document.getElementById('root')
)
