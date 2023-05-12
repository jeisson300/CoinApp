import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { CoinApp } from './CoinApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CoinApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
