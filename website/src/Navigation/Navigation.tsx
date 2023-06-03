import { Outlet, Link } from "react-router-dom";

function Navigation() {
    return (
      <div>
       <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Blogs</Link>
          </li>
          <li>
            <Link to="/headline">Healdine</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      </div>
    );
  }
  
  export default Navigation;