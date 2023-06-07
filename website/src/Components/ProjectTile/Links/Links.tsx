import { IProject } from '../../../Types/ProjectData'
import './Links.scss'

function Links(props: IProject) {
  return (
    <div className="project-links">
      {props.hasWebsite && (
        <a href={props.website} target="_blank" rel="noreferrer">
          <i className="fas fa-globe"></i>
        </a>
      )}
      {props.onGithub && (
        <a href={props.github} target="_blank" rel="noreferrer">
          <i className="fab fa-github"></i>
        </a>
      )}
    </div>
  )
}

export default Links
