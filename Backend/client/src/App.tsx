import React from 'react'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {
    return (
    <div>
      <p>{import.meta.env.VITE_SOME_KEY}</p>
      <Outlet/>
    </div>
  )
}

export default App