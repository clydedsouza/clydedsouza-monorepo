import { HashRouter, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import { sendNavigationClickedEvent } from '../../Api/Analytics'
import AboutMe from '../../Pages/AboutMe/AboutMe'
import Platforms from '../../Pages/Platforms/Platforms'
import Portfolio from '../../Pages/Portfolio/Portfolio'
import './Navigation.scss'
import { PageTypes } from './PageTypes'

function Menu() {
  return (
    <>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => sendNavigationClickedEvent(PageTypes.About)}
        >
          {PageTypes.About}
        </NavLink>
        <NavLink
          to={PageTypes.Portfolio.toLowerCase()}
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => sendNavigationClickedEvent(PageTypes.Portfolio)}
        >
          {PageTypes.Portfolio}
        </NavLink>
        <NavLink
          to={PageTypes.Platforms.toLowerCase()}
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => sendNavigationClickedEvent(PageTypes.Platforms)}
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
    <HashRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<AboutMe />} />
          <Route
            path={PageTypes.Portfolio.toLowerCase()}
            element={<Portfolio />}
          />
          <Route
            path={PageTypes.Platforms.toLowerCase()}
            element={<Platforms />}
          />
          <Route path="*" element={<AboutMe />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default Navigation
