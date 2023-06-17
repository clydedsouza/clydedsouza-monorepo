import Mainstage from './Components/Mainstage/Mainstage'
import Sidebar from './Components/Sidebar/Sidebar'

export function App() {
  console.log(process.env.NODE_ENV)
  return (
    <>
      <Sidebar />
      <Mainstage />
    </>
  )
}
