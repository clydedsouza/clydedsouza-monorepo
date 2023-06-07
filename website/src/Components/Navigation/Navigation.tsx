import { BrowserRouter, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import AboutMe from '../../Pages/AboutMe/AboutMe'
import Projects from '../../Pages/Projects/Projects'
import { PageTypes } from '../../Types/PageTypes'
import './Navigation.scss'

function Menu() {
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
          to={PageTypes.Highlights.toLowerCase()}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {PageTypes.Highlights}
        </NavLink>
        <NavLink
          to={PageTypes.Platforms.toLowerCase()}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {PageTypes.Platforms}
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<AboutMe />} />
          <Route
            path={PageTypes.Highlights.toLowerCase()}
            element={<Projects name={PageTypes.Highlights} />}
          />
          <Route
            path={PageTypes.Platforms.toLowerCase()}
            element={<Projects name={PageTypes.Platforms} />}
          />
          <Route path="*" element={<AboutMe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
