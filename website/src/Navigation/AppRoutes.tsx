import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import AboutMe from '../AboutMe/AboutMe'
import Projects from '../Projects/Projects'
import { PageTypes } from '../Types/PageTypes'

function Navigation() {
  return (
    <>
      <nav>
        <Link to="/">{PageTypes.About}</Link>
        <Link to="/projects">{PageTypes.Projects}</Link>
        <Link to="/speaking">{PageTypes.Speaking}</Link>
        <Link to="/teaching">{PageTypes.Teaching}</Link>
        <Link to="/books">{PageTypes.Books}</Link>
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
            path="projects"
            element={<Projects name={PageTypes.Projects} />}
          />
          <Route
            path="speaking"
            element={<Projects name={PageTypes.Speaking} />}
          />
          <Route
            path="teaching"
            element={<Projects name={PageTypes.Teaching} />}
          />
          <Route path="books" element={<Projects name={PageTypes.Books} />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
