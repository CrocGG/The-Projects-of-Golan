import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/layout/Layout'
import { Provider as Redux } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/Store'
import Auth from './components/auth/Auth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth>
        <Redux store={store}>
          <Layout />
        </Redux>
      </Auth>
    </BrowserRouter>
  </StrictMode>
)
