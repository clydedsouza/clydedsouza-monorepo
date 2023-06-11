import Envelope from '../../Icons/Envelope'
import GitHub from '../../Icons/GitHub'
import LinkedIn from '../../Icons/LinkedIn'
import Medium from '../../Icons/Medium'
import Twitter from '../../Icons/Twitter'
import YouTube from '../../Icons/YouTube'
import './SocialIcons.scss'

function SocialIcons() {
  return (
    <div className="social-icons">
      <span>
        <a
          href="https://linkedin.com/in/clydedz/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIn />
        </a>
      </span>
      <span>
        <a href="https://twitter.com/clydedz" target="_blank" rel="noreferrer">
          <Twitter />
        </a>
      </span>
      <span>
        <a
          href="https://www.youtube.com/@clydedz"
          target="_blank"
          rel="noreferrer"
        >
          <YouTube />
        </a>
      </span>
      <span>
        <a href="https://github.com/ClydeDz/" target="_blank" rel="noreferrer">
          <GitHub />
        </a>
      </span>
      <span>
        <a href="https://medium.com/@clydedz" target="_blank" rel="noreferrer">
          <Medium />
        </a>
      </span>
      <span>
        <a
          href="mailto:clyde@clydedsouza.net?Subject=Hi%20Clyde%21&Body=Hi%20Clyde,%20%0D%0DI%20wanted%20to%20get%20in%20touch%20with%20you.%0D%0DThanks,%20%0D%0DSent%20from%20https%3A%2F%2Fclydedsouza.net"
          target="_blank"
          rel="noreferrer"
        >
          <Envelope />
        </a>
      </span>
    </div>
  )
}

export default SocialIcons
