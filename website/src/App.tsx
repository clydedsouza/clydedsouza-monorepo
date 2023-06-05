import './App.css'
import Cta from './Components/Cta/Cta'
import AppRoutes from './Components/Navigation/AppRoutes'
import Sidebar from './Components/Sidebar/Sidebar'

function App() {
  return (
    <>
      <Sidebar />
      <main>
        <div>
          <div id="view">
            <AppRoutes />
          </div>
        </div>
        <footer>
          <Cta />
          <p>Website crafted by Clyde DSouza</p>
        </footer>
      </main>
    </>
  )
}

export default App
