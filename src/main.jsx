import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'
import Main from './Layouts/Main.jsx'
import Dashboard from './Page/Dashboard/Dashboard.jsx'
import Home from './Page/home/Home.jsx'
import Login from './Page/Auth/Login.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './router/PrivateRoute.jsx'
import Register from './Page/Auth/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>
<BrowserRouter>
<Routes>
      <Route path="/" element={<Main/>}>
      <Route index element={<Home/>} />
      <Route path='/dashboard' element={ <PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      </Route>
     


    </Routes>
</BrowserRouter>
<Toaster position='top-right' reverseOrder={false} />
</AuthProvider>
  </StrictMode>,
)
