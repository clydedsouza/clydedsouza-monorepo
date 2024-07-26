import { sendLinkClickedEvent } from '../../../Api/Analytics'
import { AnalyticsLinkType } from '../../../Api/IAnalytics'
import Envelope from '../../Icons/Envelope'
import GitHub from '../../Icons/GitHub'
import LinkedIn from '../../Icons/LinkedIn'
import Medium from '../../Icons/Medium'
import Twitter from '../../Icons/Twitter'
import YouTube from '../../Icons/YouTube'
import './SocialIcons.scss'

const LINKEDIN_PROFILE = 'https://linkedin.com/in/clydedz/'
const TWITTER_PROFILE = 'https://twitter.com/clydedz'
const YOUTUBE_PROFILE = 'https://www.youtube.com/@clydedz'
const GITHUB_PROFILE = 'https://github.com/ClydeDz/'
const MEDIUM_PROFILE = 'https://medium.com/@clydedz'
const EMAIL_ADDRESS = 'mailto:clyde@clydedsouza.net'

function SocialIcons() {
  return (
    <div className="social-icons">
      <span>
        <a
          href={LINKEDIN_PROFILE}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            sendLinkClickedEvent({
              link: LINKEDIN_PROFILE,
              type: AnalyticsLinkType.SocialIcons,
            })
          }
        >
          <LinkedIn />
        </a>
      </span>
      <span>
        <a
          href={TWITTER_PROFILE}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            sendLinkClickedEvent({
              link: TWITTER_PROFILE,
              type: AnalyticsLinkType.SocialIcons,
            })
          }
        >
          <Twitter />
        </a>
      </span>
      <span>
        <a
          href={YOUTUBE_PROFILE}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            sendLinkClickedEvent({
              link: YOUTUBE_PROFILE,
              type: AnalyticsLinkType.SocialIcons,
            })
          }
        >
          <YouTube />
        </a>
      </span>
      <span>
        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            sendLinkClickedEvent({
              link: GITHUB_PROFILE,
              type: AnalyticsLinkType.SocialIcons,
            })
          }
        >
          <GitHub />
        </a>
      </span>
      <span>
        <a
          href={MEDIUM_PROFILE}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            sendLinkClickedEvent({
              link: MEDIUM_PROFILE,
              type: AnalyticsLinkType.SocialIcons,
            })
          }
        >
          <Medium />
        </a>
      </span>
      <span>
        <a
          href={`${EMAIL_ADDRESS}?Subject=Hi%20Clyde%21&Body=Hi%20Clyde,%20%0D%0DI%20wanted%20to%20get%20in%20touch%20with%20you.%0D%0DThanks,%20%0D%0DSent%20from%20https%3A%2F%2Fclydedsouza.net`}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            sendLinkClickedEvent({
              link: EMAIL_ADDRESS,
              type: AnalyticsLinkType.SocialIcons,
            })
          }
        >
          <Envelope />
        </a>
      </span>
    </div>
  )
}

export default SocialIcons
