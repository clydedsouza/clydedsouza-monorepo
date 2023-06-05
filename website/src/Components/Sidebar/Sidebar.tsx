import Cta from '../Cta/Cta'

function Sidebar() {
  return (
    <>
      <div id="sidebar">
        <div
          className="sidebar-background"
          style={{ background: `url(images/clyde2023.jpg) center` }}
        ></div>
        <h1>Clyde DSouza</h1>
        <div className="sidebar-tagline">
          <p>Software Engineer and Author</p>
          <p>
            <small>Auckland, New Zealand</small>
          </p>
        </div>
        <div className="sidebar-icons">
          <span>
            <a
              href="https://linkedin.com/in/clydedz/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </span>
          <span>
            <a
              href="mailto:clyde@clydedsouza.net?Subject=Hi%20Clyde%21&Body=Hi%20Clyde,%20%0D%0DI%20wanted%20to%20get%20in%20touch%20with%20you.%0D%0DThanks,%20%0D%0DSent%20from%20https%3A%2F%2Fclydedsouza.net"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </span>
          <span>
            <a
              href="https://twitter.com/clydedz"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </span>
          <span>
            <a
              href="https://github.com/ClydeDz/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
          </span>
          <span>
            <a
              href="https://www.youtube.com/@clydedz"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </span>
          <span>
            <a
              href="https://medium.com/@clydedz"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-medium"></i>
            </a>
          </span>
        </div>
        <div className="sidebar-highlights">
          <Cta />
        </div>
      </div>
    </>
  )
}

export default Sidebar