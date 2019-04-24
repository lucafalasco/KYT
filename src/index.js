import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'components/App'
import 'modern-normalize'
import 'tachyons'
import 'tachyons-extra'
import 'style.css'
import { Provider } from 'mobx-react'
import { State } from './state'

function renderApp() {
  ReactDOM.render(
    <Provider state={State}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
}

// First render
renderApp()

// Hot module reloading
if (module.hot) {
  module.hot.accept('components/App', () => {
    console.clear()
    renderApp()
  })
}
