import { sendLinkClickedEvent } from '../../../../Api/Analytics'
import { AnalyticsLinkType } from '../../../../Api/IAnalytics'
import { IProject } from '../../../../Api/IProjectData'
import GitHub from '../../../Icons/GitHub'
import Globe from '../../../Icons/Globe'
import './Links.scss'

function Links(props: Partial<IProject>) {
  if (!props.website && !props.github) return <></>

  return (
    <div className="card-links">
      {props.website && (
        <a
          href={props.website}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            sendLinkClickedEvent({
              link: props.website,
              type: AnalyticsLinkType.CardWebsite,
            })
          }
        >
          <Globe />
        </a>
      )}
      {props.github && (
        <a
          href={props.github}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            sendLinkClickedEvent({
              link: props.github,
              type: AnalyticsLinkType.CardGitHub,
            })
          }
        >
          <GitHub />
        </a>
      )}
    </div>
  )
}

export default Links
