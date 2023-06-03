import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppRoutes from './Navigation/AppRoutes'

function App() {
  return (
    <div className="App">
      <h1>eifugwiuegfiwegfi</h1>
      <BrowserRouter children={<AppRoutes />} />
      <p>
        gigehorighoeirhg
        gergoiherogheroighoierhgoierhoghoerhgoherghiooheroghoerhgoheroghorehg
      </p>
      {/* <header className="App-header">
        <Headline />
        <AboutMe />
      </header> */}
    </div>
  )
}

export default App
