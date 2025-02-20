import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'
import Main from './Layouts/Main.jsx'
import Dashboard from './Page/Dashboard/Dashboard.jsx'
import Home from './Page/home/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
<Routes>
      <Route path="/" element={<Main/>}>
      <Route index element={<Home/>} />
      <Route path='/dashboard' element={ <Dashboard />} />
      
      </Route>
     


    </Routes>
</BrowserRouter>
  </StrictMode>,
)
