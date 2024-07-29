import { useEffect } from 'react'
import { sendPageViewEvent } from '../../Api/Analytics'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import Seo from '../../Components/Seo/Seo'
import Bio from './Bio/Bio'
import Highlights from './Highlights/Highlights'

function AboutMe() {
  useEffect(() => {
    sendPageViewEvent(PageTypes.About)
  }, [])

  return (
    <>
      <Seo />
      <Bio />
      <br></br>
      <Highlights />
    </>
  )
}

export default AboutMe
