import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../../Api/Cache'
import { IProject } from '../../../Api/IProjectData'
import Loader from '../../../Components/Loader/Loader'
import { LoaderTypes } from '../../../Components/Loader/LoaderTypes'
import { PageTypes } from '../../../Components/Navigation/PageTypes'
import ProjectTile from '../../../Components/ProjectTile/ProjectTile'

const MAX_HIGHLIGHT_ITEMS = 3

function Highlights() {
  const [projectData, setProjectData] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    getCachedProjectData(PageTypes.Highlights)
      .then((apiResponse) => {
        setProjectData(apiResponse.data)
      })
      .catch(() => {
        setProjectData([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <h2>Highlights</h2>
      {isLoading ? (
        <Loader variant={LoaderTypes.Primary} />
      ) : (
        <div className="highlights">
          {projectData.length > 0 ? (
            projectData
              .sort((dateA, dateB) => {
                if (!dateA.date || !dateB.date) return 0
                return (
                  Number(new Date(dateB.date)) - Number(new Date(dateA.date))
                )
              })
              .slice(0, MAX_HIGHLIGHT_ITEMS)
              .map((item) => <ProjectTile {...item} key={item.title} />)
          ) : (
            <p>Couldn&lsquo;t load the data at this stage</p>
          )}
        </div>
      )}
    </>
  )
}

export default Highlights
