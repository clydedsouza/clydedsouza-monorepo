import { IProject } from '../../Types/ProjectData'
import Links from './Links/Links'
import MadeUsing from './MadeUsing/MadeUsing'
import './ProjectTile.scss'

function ProjectTile(props: IProject) {
  return (
    <div className="project-tile">
      <div
        style={{
          backgroundImage: `url(${props.image}), url("https://files.clydedsouza.net/images/projects/omg-team.jpg")`,
        }}
      >
        <span>{props.category}</span>
      </div>
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <MadeUsing {...props} />
        <Links {...props} />
      </div>
    </div>
  )
}

export default ProjectTile
