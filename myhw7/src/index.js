import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import Apps from './components/app.js'
import reducer from './reducer'

const logger = createLogger()
export const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))

render(
  <Provider store={store}>
    <Apps />
  </Provider>,
  document.getElementById('app')
)