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
          to="/projects"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {PageTypes.Projects}
        </NavLink>
        <NavLink
          to="/speaking"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {PageTypes.Speaking}
        </NavLink>
        <NavLink
          to="/teaching"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {PageTypes.Teaching}
        </NavLink>
        <NavLink
          to="/books"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {PageTypes.Books}
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
            path={PageTypes.Projects.toLowerCase()}
            element={<Projects name={PageTypes.Projects} />}
          />
          <Route
            path={PageTypes.Speaking.toLowerCase()}
            element={<Projects name={PageTypes.Speaking} />}
          />
          <Route
            path={PageTypes.Teaching.toLowerCase()}
            element={<Projects name={PageTypes.Teaching} />}
          />
          <Route
            path={PageTypes.Books.toLowerCase()}
            element={<Projects name={PageTypes.Books} />}
          />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
