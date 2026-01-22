import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'notyf/notyf.min.css'
import Layout from './components/layout/layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/Store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* This makes the Redux store available to all components via useSelector/useDispatch */}
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
