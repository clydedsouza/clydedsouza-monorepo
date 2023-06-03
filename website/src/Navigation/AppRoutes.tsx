import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AboutMe from '../AboutMe/AboutMe'
import Headline from '../Headline/Headline'
import ProjectTile from '../ProjectTile/ProjectTile'
import Navigation from './Navigation'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<AboutMe />} />
          <Route path="headline" element={<Headline />} />
          <Route
            path="projects"
            element={<ProjectTile name={''} image={''} description={''} />}
          />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
