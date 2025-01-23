// import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterConfig } from './Config/RouterConfig'


function App() {
  return (
    <>
      <div className='bg-white min-h-screen' >
        <RouterConfig />
      </div>
    </>
  )
}

export default App;
