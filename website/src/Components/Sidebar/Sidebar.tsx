import Cta from '../Cta/Cta'
import Avatar from './Avatar/Avatar'
import Headline from './Headline/Headline'
import './Sidebar.scss'
import SocialIcons from './SocialIcons/SocialIcons'

function Sidebar() {
  return (
    <div id="sidebar">
      <Avatar />
      <Headline />
      <SocialIcons />
      <Cta />
    </div>
  )
}

export default Sidebar
