import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import LandingPage from './components/LandingPage'


function App() {
  return (
    <>
      <NavBar />
      <LandingPage />
    </>
  );
}

// function ColorBox({ name, className, text }) {
//   return (
//     <div
//       className={`h-24 w-50 rounded-lg flex items-center justify-center ${className}`}
//     >
//       <span className={`text-body-1 ${text}`}>{name}</span>
//     </div>
//   );
// }

export default App
