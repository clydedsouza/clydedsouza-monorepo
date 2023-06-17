import { useEffect } from 'react'
import { initAnalyticsWithSuperProperties } from './Api/Analytics'
import Mainstage from './Components/Mainstage/Mainstage'
import Sidebar from './Components/Sidebar/Sidebar'

export function App() {
  useEffect(() => {
    initAnalyticsWithSuperProperties()
  }, [])

  return (
    <>
      <Sidebar />
      <Mainstage />
    </>
  )
}
