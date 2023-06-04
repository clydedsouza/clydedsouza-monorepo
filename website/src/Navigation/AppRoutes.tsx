import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import AboutMe from '../AboutMe/AboutMe'
import Projects from '../Projects/Projects'

function Navigation() {
  return (
    <>
      <nav>
        <Link to="/">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/speaking">Speaking</Link>
        <Link to="/teaching">Teaching</Link>
        <Link to="/books">Books</Link>
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
          <Route path="projects" element={<Projects name="Projects" />} />
          <Route path="speaking" element={<Projects name={'Speaking'} />} />
          <Route path="teaching" element={<Projects name={'Teaching'} />} />
          <Route path="books" element={<Projects name="Books" />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
