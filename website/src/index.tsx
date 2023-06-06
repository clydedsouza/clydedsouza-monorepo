import React from 'react'
import ReactDOM from 'react-dom/client'
import Mainstage from './Components/Mainstage/Mainstage'
import Sidebar from './Components/Sidebar/Sidebar'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <>
      <Sidebar />
      <Mainstage />
    </>
  </React.StrictMode>
)
