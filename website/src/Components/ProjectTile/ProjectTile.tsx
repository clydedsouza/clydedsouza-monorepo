import { IProject } from '../../Types/ProjectData'
import './ProjectTile.scss'

function ProjectTile(props: IProject) {
  return (
    <section className="project-tile">
      <div
        className="project-header"
        style={{
          backgroundImage: `url(${props.image}), url("https://files.clydedsouza.net/images/projects/omg-team.jpg")`,
        }}
      >
        <div className="project-header-contents">
          <div>
            <span>{props.category}</span>
          </div>
        </div>
      </div>
      <div className="project-body">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p>
          {props.madeUsing &&
            props.madeUsing.map((item) => <span key={item}>{item}</span>)}
        </p>
        <div>
          <div className="col-xs-8 text-left">&nbsp;</div>
          <div className="col-xs-4 text-right">
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
        </div>
      </div>
    </section>
  )
}

export default ProjectTile