import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../Api/Cache'
import { PageTypes } from '../../Types/PageTypes'
import { IProject } from '../../Types/ProjectData'

function Cta() {
  const [projectData, setProjectData] = useState<IProject[]>([])

  useEffect(() => {
    getCachedProjectData(PageTypes.Highlights)
      .then((apiResponse) => {
        setProjectData(apiResponse.data)
      })
      .catch(() => {
        setProjectData([])
      })
  }, [])

  const CtaLink = (items: IProject[]) => {
    if (items.length < 1) return
    const randomizedProject =
      items[Math.floor(Math.random() * (items.length - 1 - 0 + 1) + 0)]
    return (
      <>
        <p>
          <a href={randomizedProject.website} target="_blank" rel="noreferrer">
            {randomizedProject.title}
          </a>
        </p>
      </>
    )
  }

  return (
    <>
      {projectData.length > 0 ? (
        CtaLink(projectData)
      ) : (
        <p>Couldn&lsquo;t load the data at this stage</p>
      )}
    </>
  )
}

export default Cta