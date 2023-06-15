import { IProject } from '../../../Api/IProjectData'
import './Card.scss'
import Links from './Links/Links'
import MadeUsing from './MadeUsing/MadeUsing'

function Card(props: IProject) {
  return (
    <div className="project-tile">
      <div
        style={{
          backgroundImage: `url(${props.image}), url("https://files.clydedsouza.net/highlights/omg-team.jpg")`,
        }}
        aria-label={props.imageDescription}
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

export default Card
