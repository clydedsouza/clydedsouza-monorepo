import { IProject } from '../../../Types/ProjectData'
import GitHub from '../../Sidebar/SocialIcons/Icons/GitHub'
import Globe from '../../Sidebar/SocialIcons/Icons/Globe'
import './Links.scss'

function Links(props: Partial<IProject>) {
  if (!props.hasWebsite && !props.onGithub) return <></>

  return (
    <div className="project-links">
      {props.hasWebsite && (
        <a href={props.website} target="_blank" rel="noreferrer">
          <Globe />
        </a>
      )}
      {props.onGithub && (
        <a href={props.github} target="_blank" rel="noreferrer">
          <GitHub />
        </a>
      )}
    </div>
  )
}

export default Links
