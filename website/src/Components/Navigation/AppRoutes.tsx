import { BrowserRouter, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import AboutMe from '../../Pages/AboutMe/AboutMe'
import Projects from '../../Pages/Projects/Projects'
import { PageTypes } from '../../Types/PageTypes'

function Navigation() {
  return (
    <>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {PageTypes.About}
        </NavLink>
        <NavLink
          to="/highlights"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {PageTypes.Highlights}
        </NavLink>
        <NavLink
          to="/platforms"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {PageTypes.Platforms}
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<AboutMe />} />
          <Route
            path={PageTypes.Highlights.toLowerCase()}
            element={<Projects name={PageTypes.Highlights} />}
          />
          <Route
            path={PageTypes.Platforms.toLowerCase()}
            element={<Projects name={PageTypes.Platforms} />}
          />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
